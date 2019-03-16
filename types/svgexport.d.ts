declare module 'svgexport' {
  type DataProperty = string | string[];

  interface Data {
    src?: DataProperty;
    input?: DataProperty;
    dest?: DataProperty;
    output?: DataProperty;
  }

  export function cli(args: string[]): void;
  export function render(data: Data | Data[], done: (err?: Error) => void): void;
}
