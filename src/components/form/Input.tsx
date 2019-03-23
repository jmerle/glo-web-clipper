import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  placeholder?: string;
}

export const Input: Component<Attributes> = ({ label, placeholder = label }) =>
  (
    <FormSection>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} />
    </FormSection>
  ) as VNode<Attributes>;
