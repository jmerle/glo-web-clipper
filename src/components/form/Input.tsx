import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onInput: (value: string) => void;
  placeholder?: string;
  password?: boolean;
  initialValue?: string;
}

export const Input: Component<Attributes> = ({ label, onInput, placeholder = label, password = false, initialValue }) =>
  (
    <FormSection>
      <label>{label}</label>
      <input
        type={password ? 'password' : 'text'}
        class="gwc-input"
        value={initialValue}
        placeholder={placeholder}
        oninput={(ev: any) => onInput(ev.target.value)}
      />
    </FormSection>
  ) as VNode<Attributes>;
