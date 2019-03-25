import { Component } from 'hyperapp';
import { VisiblePageIcon } from '../components/icons';
import { capturePage } from '../utils/messaging';
import { Clipper } from './Clipper';

export class VisiblePageClipper extends Clipper {
  public getLabel(): string {
    return 'Visible page';
  }

  public getIcon(): Component {
    return VisiblePageIcon;
  }

  public async getImage(): Promise<string> {
    return capturePage();
  }
}
