import { Component, h, VNode } from 'hyperapp';
import { FormSection } from './FormSection';

interface SelectItem {
  value: string;
  label: string;
}

interface Attributes {
  label: string;
  placeholder?: string;
  options: SelectItem[];
}

export const Select: Component<Attributes> = ({ label, options, placeholder = label }) =>
  (
    <FormSection>
      <label>{label}</label>
      <select>
        <option disabled selected>
          {placeholder}
        </option>
        {options.map(({ value, label: optionLabel }) => (
          <option key={value}>{optionLabel}</option>
        ))}
      </select>
    </FormSection>
  ) as VNode<Attributes>;
