import { Component } from 'hyperapp';
import { SelectionIcon } from '../components/icons';
import { Clipper } from './Clipper';

export class SelectionClipper extends Clipper {
  public getLabel(): string {
    return 'Selection';
  }

  public getIcon(): Component {
    return SelectionIcon;
  }

  public async getImage(): Promise<string> {
    return 'https://dummyimage.com/500x500/000/fff.png';
  }
}
