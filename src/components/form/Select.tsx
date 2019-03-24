import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

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
      <select class="gwc-select">
        <option disabled selected>
          {placeholder}
        </option>
        {options.map(({ value, label: optionLabel }) => (
          <option key={value}>{optionLabel}</option>
        ))}
      </select>
    </FormSection>
  ) as VNode<Attributes>;
