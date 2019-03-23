import { Component, h } from 'hyperapp';

export const Box: Component = ({}, children) => (
  <div class="gwc-box">
    <span className="gwc-close-btn">✕</span>

    {children}
  </div>
);
