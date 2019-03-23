import { Component, h, VNode } from 'hyperapp';

interface Attributes {
  header: string;
}

export const Section: Component<Attributes> = ({ header }, children) =>
  (
    <div>
      <div className="gwc-header">{header}</div>

      {children}
    </div>
  ) as VNode<Attributes>;
