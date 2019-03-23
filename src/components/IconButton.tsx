import { Component, h, VNode } from 'hyperapp';

interface Attributes {
  icon: JSX.Element;
  label: string;
  selectable?: boolean;
  selected?: boolean;
}

export const IconButton: Component<Attributes> = ({ icon, label, selectable = false, selected = true }) => {
  const classes = ['gwc-btn gwc-icon-btn'];

  if (selectable) {
    classes.push('gwc-selectable-btn');
  }

  if (selected) {
    classes.push('gwc-selected-btn');
  }

  return (
    <button class={classes.join(' ')}>
      {icon}

      <div class="gwc-btn-label">{label}</div>
    </button>
  ) as VNode<Attributes>;
};
