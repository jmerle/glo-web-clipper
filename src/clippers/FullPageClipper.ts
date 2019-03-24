import { Component } from 'hyperapp';
import { FullPageIcon } from '../components/icons';
import { Clipper } from './Clipper';

export class FullPageClipper extends Clipper {
  public getLabel(): string {
    return 'Full page';
  }

  public getIcon(): Component {
    return FullPageIcon;
  }

  public async getImage(): Promise<string> {
    return 'https://dummyimage.com/400x400/000/fff.png';
  }
}
