import { Component, h } from 'hyperapp';

export const Grid: Component = ({}, children) => <div class="gwc-grid">{children}</div>;

export const Column: Component = ({}, children) => <div class="gwc-col">{children}</div>;
