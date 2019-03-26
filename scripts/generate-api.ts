// tslint:disable no-implicit-dependencies

import * as execa from 'execa';
import * as fs from 'fs-extra';
import * as got from 'got';
import * as path from 'path';
import * as vm from 'vm';

function findDeep(obj: any, key: string, results: any[] = []): any[] {
  Object.keys(obj).forEach(k => {
    if (k === key) {
      results.push(obj[key]);
    }

    if (typeof obj[k] === 'object') {
      findDeep(obj[k], key, results);
    }

    if (k === key) {
      return results;
    }
  });

  return results;
}

function exec(file: string, args?: ReadonlyArray<string>, options?: execa.Options): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`$ ${file} ${args.join(' ')}`.trim());

    const child = execa(file, args, options);

    child.stdout.on('data', (data: any) => console.log(data.toString().trim()));
    child.stderr.on('data', (data: any) => console.error(data.toString().trim()));

    child.on('close', async (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`The process exited with status code ${code}`);
        process.exit(code);
      }
    });
  });
}

const operationIds: { [path: string]: { [method: string]: string } } = {
  '/boards': {
    get: 'getBoards',
    post: 'createBoard',
  },
  '/boards/{board_id}': {
    get: 'getBoardById',
    post: 'editBoard',
    delete: 'deleteBoard',
  },
  '/boards/{board_id}/columns': {
    post: 'createColumn',
  },
  '/boards/{board_id}/columns/{column_id}': {
    post: 'editColumn',
    delete: 'deleteColumn',
  },
  '/boards/{board_id}/cards': {
    get: 'getCards',
    post: 'createCard',
  },
  '/boards/{board_id}/cards/batch': {
    post: 'createCards',
  },
  '/boards/{board_id}/cards/{card_id}': {
    get: 'getCardById',
    post: 'editCard',
    delete: 'deleteCard',
  },
  '/boards/{board_id}/labels': {
    post: 'createLabel',
  },
  '/boards/{board_id}/labels/{label_id}': {
    post: 'editLabel',
    delete: 'deleteLabel',
  },
  '/boards/{board_id}/columns/{column_id}/cards': {
    get: 'getCardsByColumn',
  },
  '/boards/{board_id}/cards/{card_id}/attachments': {
    get: 'getAttachments',
    post: 'createAttachment',
  },
  '/boards/{board_id}/cards/{card_id}/comments': {
    get: 'getComments',
    post: 'createComment',
  },
  '/boards/{board_id}/cards/{card_id}/comments/{comment_id}': {
    post: 'editComment',
    delete: 'deleteComment',
  },
  '/user': {
    get: 'getUser',
  },
};

(async () => {
  try {
    console.log('Retrieving API definition');

    const { body } = await got('https://gloapi.gitkraken.com/v1/docs/swagger-ui-init.js');
    const fnBody = body
      .split('\n')
      .slice(1, -1)
      .join('\n');

    const context: vm.Context = {
      window: {
        location: {
          search: '',
        },
      },
    };

    try {
      vm.createContext(context);
      vm.runInContext(fnBody, context);
    } catch (err) {
      // We only need the script to run until spec1 is set
      // Any errors after that has happened are ignored
      if (!context.spec1) {
        console.error(err);
        process.exit(1);
      }
    }

    let spec = context.spec1;

    // Fix some errors in the definition
    delete spec.components.securitySchemes.api_oauth.bearerFormat;
    spec = JSON.parse(JSON.stringify(spec).replace(/"int"/g, '"integer"'));
    spec = JSON.parse(JSON.stringify(spec).replace(/"string,"/g, '"string"'));

    // Remove read-only flags, it creates incorrect create* methods
    findDeep(spec, 'properties').forEach(props => {
      delete props.readOnly;

      Object.keys(props).forEach(propKey => {
        delete props[propKey].readOnly;
      });
    });

    // The generator can't handle multiple schema definitions in allOf's, converting them to $ref's
    findDeep(spec, 'allOf').forEach(arr => {
      if (arr.length === 2) {
        const baseModel = arr[0].$ref.split('/').pop();
        const baseDefinition = spec.components.schemas[baseModel];

        const extraProperties = arr[1].properties;
        const extraKeys = Object.keys(extraProperties).map(name =>
          name
            .split('_')
            .map(part => part[0].toUpperCase() + part.substr(1))
            .join(''),
        );

        const newName = `${baseModel}With${extraKeys.join('And')}`;
        spec.components.schemas[newName] = {
          ...baseDefinition,
          properties: {
            ...baseDefinition.properties,
            ...extraProperties,
          },
        };

        arr[0] = { $ref: `#/components/schemas/${newName}` };
        arr.splice(1);
      }
    });

    // The generator adds weird UNKNOWN_BASE_TYPE parameters if this is not added
    findDeep(spec, 'application/json').forEach(result => {
      if (result.schema && result.schema.allOf) {
        result.schema = result.schema.allOf[0];
      }
    });

    // Set operation id's which are used as method names
    Object.keys(spec.paths).forEach(url => {
      Object.keys(spec.paths[url]).forEach(method => {
        if (operationIds[url] && operationIds[url][method]) {
          spec.paths[url][method].operationId = operationIds[url][method];
        } else {
          console.error(`No operation id for a ${method} request on ${url} found`);
          process.exit(1);
        }
      });
    });

    const definitionPath = path.resolve(__dirname, '../api.json');
    const definitionData = JSON.stringify(spec, null, 2);
    await fs.writeFile(definitionPath, definitionData);

    console.log('Removing current API client');

    const apiDirectory = path.resolve(__dirname, '../src/api');
    await fs.remove(apiDirectory);

    console.log('Generating new API client');

    await exec('yarn', ['openapi-generator', 'generate', '-i', 'api.json', '-g', 'typescript-fetch', '-o', 'src/api']);

    // Ignore "implicitly has an 'any' return type" errors in the generated files
    const runtimePath = path.resolve(apiDirectory, 'runtime.ts');
    const content = await fs.readFile(runtimePath, 'utf8');
    const lines = content.trim().split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('export function querystring(') || line === 'async value() {') {
        lines.splice(i, 0, '// @ts-ignore');
        i++;
      }
    }

    await fs.writeFile(runtimePath, lines.join('\n') + '\n');

    // Formatting files using Prettier
    await exec('yarn', ['prettier', '--write', apiDirectory + '/**/*.{ts,json}']);
  } catch (err) {
    console.error(err);
  }
})();
