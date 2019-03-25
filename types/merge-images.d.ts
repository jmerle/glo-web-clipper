declare module 'merge-images' {
  type ImageSource = string | { src: string; x?: number; y?: number; opacity?: number };

  interface Options {
    format?: string;
    quality?: number;
    width?: number;
    height?: number;
    Canvas?: any;
  }

  export default function mergeImages(sources: ImageSource[], options?: Options): Promise<string>;
}
