declare module 'chrome-launch' {
  interface Options {
    args?: string[];
    env?: NodeJS.ProcessEnv;
    dir?: string;
    nuke?: boolean;
  }

  function launchChrome(uri: string, opts: Options): void;

  export = launchChrome;
}
