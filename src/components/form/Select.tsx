import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

export interface SelectItem {
  value: string;
  label: string;
}

interface Attributes {
  label: string;
  options: SelectItem[];
  selectedValue: string;
  disabled: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}

export const Select: Component<Attributes> = ({ label, options, selectedValue, disabled, placeholder, onChange }) => {
  return (
    <FormSection>
      <label>{label}</label>
      <select class="gwc-select" disabled={disabled} oninput={(e: any) => onChange(e.target.value)}>
        <option disabled selected={selectedValue === null}>
          {placeholder}
        </option>

        {disabled ||
          options.map(({ value, label: optionLabel }) => (
            <option key={value} value={value} selected={selectedValue === value}>
              {optionLabel}
            </option>
          ))}
      </select>
    </FormSection>
  ) as VNode<Attributes>;
};
