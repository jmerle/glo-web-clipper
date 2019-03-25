import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  password?: boolean;
  value?: string;
}

export const Input: Component<Attributes> = ({ label, onChange, placeholder = label, password = false, value }) =>
  (
    <FormSection>
      <label>{label}</label>
      <input
        type={password ? 'password' : 'text'}
        class="gwc-input"
        value={value}
        placeholder={placeholder}
        oninput={(ev: any) => onChange(ev.target.value)}
      />
    </FormSection>
  ) as VNode<Attributes>;
