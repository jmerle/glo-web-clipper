import { Component, h, VNode } from 'hyperapp';
import { FormSection } from './FormSection';

interface Attributes {
  label: string;
  selected?: boolean;
}

export const Checkbox: Component<Attributes> = ({ label, selected = false }) =>
  (
    <FormSection>
      <label className="gwc-checkbox">
        {label}
        <input type="checkbox" name="checked" defaultChecked={selected} />
        <span />
      </label>
    </FormSection>
  ) as VNode<Attributes>;
