import { Component } from 'hyperapp';

export abstract class Clipper {
  public abstract getLabel(): string;

  public abstract getIcon(): Component;

  public abstract async getImage(): Promise<string>;
}
