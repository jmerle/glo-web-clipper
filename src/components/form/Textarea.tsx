import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export const Textarea: Component<Attributes> = ({ label, onChange, placeholder = label, value }) =>
  (
    <FormSection>
      <label>{label}</label>
      <textarea class="gwc-textarea" rows="3" placeholder={placeholder} oninput={(ev: any) => onChange(ev.target.value)}>
        {value}
      </textarea>
    </FormSection>
  ) as VNode<Attributes>;
