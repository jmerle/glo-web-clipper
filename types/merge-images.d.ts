// Type definitions for merge-images 1.1
// Project: https://github.com/lukechilds/merge-images
// Definitions by: BendingBender <https://github.com/BendingBender>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'merge-images' {
  export default function mergeImages(sources: ImageSource[], options?: Options): Promise<string>;

  type ImageSource = string | { src: string; x?: number; y?: number; opacity?: number };

  interface Options {
    format?: string;
    quality?: number;
    width?: number;
    height?: number;
    Canvas?: any;
  }
}
