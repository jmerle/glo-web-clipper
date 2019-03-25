import { Component } from 'hyperapp';
import mergeImages, { ImageSource } from 'merge-images';
import { FullPageIcon } from '../components/icons';
import { capturePage } from '../utils/messaging';
import { Clipper } from './Clipper';

export class FullPageClipper extends Clipper {
  public getLabel(): string {
    return 'Full page';
  }

  public getIcon(): Component {
    return FullPageIcon;
  }

  public async getImage(): Promise<string> {
    const maxHeight = 32767;

    const elem = document.documentElement;
    const { scrollHeight } = elem;
    const { innerHeight } = window;

    const currentScrollTop = elem.scrollTop;
    const images = [];

    for (let y = 0; y < maxHeight - innerHeight && y < scrollHeight; y += innerHeight) {
      images.push(await this.getImageAtY(elem, y));
    }

    elem.scrollTop = currentScrollTop;

    return mergeImages(images, {
      height: Math.min(scrollHeight, maxHeight),
    });
  }

  private async getImageAtY(elem: Element, y: number): Promise<ImageSource> {
    elem.scrollTop = y;
    await new Promise(resolve => setTimeout(resolve, 50));

    const image = await capturePage();

    return {
      src: image,
      x: 0,
      y: elem.scrollTop,
    };
  }
}
