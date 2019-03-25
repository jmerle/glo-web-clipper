import { Component, h, VNode } from 'hyperapp';

interface Attributes {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: Component<Attributes> = ({ label, onClick, disabled = false }) =>
  (
    <button className="gwc-btn gwc-primary-btn" onclick={() => onClick()} disabled={disabled}>
      {label}
    </button>
  ) as VNode<Attributes>;
