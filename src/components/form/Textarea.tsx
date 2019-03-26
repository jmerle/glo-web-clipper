import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export const Textarea: Component<Attributes> = ({ label, onChange, placeholder = label, value }) => {
  const normalizedLabel = label
    .replace(/ /g, '-')
    .replace(/[^a-z-]/gi, '')
    .toLowerCase();

  const id = `gwc-input-${normalizedLabel}`;

  return (
    <FormSection>
      <label for={id}>{label}</label>
      <textarea
        class="gwc-textarea"
        rows="3"
        id={id}
        placeholder={placeholder}
        oninput={(ev: any) => onChange(ev.target.value)}
      >
        {value}
      </textarea>
    </FormSection>
  ) as VNode<Attributes>;
};
