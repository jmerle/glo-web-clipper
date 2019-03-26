import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  password?: boolean;
  value?: string;
}

export const Input: Component<Attributes> = ({ label, onChange, placeholder = label, password = false, value }) => {
  const normalizedLabel = label
    .replace(/ /g, '-')
    .replace(/[^a-z-]/gi, '')
    .toLowerCase();

  const id = `gwc-input-${normalizedLabel}`;

  return (
    <FormSection>
      <label for={id}>{label}</label>
      <input
        type={password ? 'password' : 'text'}
        class="gwc-input"
        id={id}
        value={value}
        placeholder={placeholder}
        oninput={(ev: any) => onChange(ev.target.value)}
      />
    </FormSection>
  ) as VNode<Attributes>;
};
