import * as Croppr from 'croppr';
import { Component } from 'hyperapp';
import { SelectionIcon } from '../components/icons';
import { capturePage } from '../utils/messaging';
import { Clipper } from './Clipper';

export class SelectionClipper extends Clipper {
  public getLabel(): string {
    return 'Selection';
  }

  public getIcon(): Component {
    return SelectionIcon;
  }

  public getImage(): Promise<string> {
    return new Promise(async resolve => {
      const imageSrc = await capturePage();

      let img = await this.createImage(imageSrc);

      const doc = document.documentElement;

      if (doc.scrollHeight > window.innerHeight) {
        const newSrc = this.cropImage(img, 0, 0, img.width - this.getScrollbarWidth(), img.height);
        img = await this.createImage(newSrc);
      }

      img.classList.add('gwc-selection');

      const instructions = document.createElement('div');
      instructions.classList.add('gwc-selection-description');
      instructions.textContent = 'Press ENTER to continue';

      const container = document.getElementById('glo-web-clipper');
      container.appendChild(img);
      container.appendChild(instructions);

      const croppr = new Croppr(img, {
        startSize: [10, 10],
      });

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          window.removeEventListener('keyup', handleKeyUp);

          const { x, y, width, height } = croppr.getValue();
          const result = this.cropImage(img, x, y, width, height);

          croppr.destroy();
          container.removeChild(img);
          container.removeChild(instructions);

          resolve(result);
        }
      };

      window.addEventListener('keyup', handleKeyUp);
    });
  }

  private createImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private cropImage(img: HTMLImageElement, x: number, y: number, width: number, height: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    return canvas.toDataURL('image/png');
  }

  // Taken from https://stackoverflow.com/a/13382873
  private getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';

    document.body.appendChild(outer);
    const withoutScroll = outer.offsetWidth;

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.style.overflow = 'scroll';

    outer.appendChild(inner);
    const withScroll = inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return withoutScroll - withScroll;
  }
}
