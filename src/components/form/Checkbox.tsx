import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';

interface Attributes {
  label: string;
  onChange: (checked: boolean) => void;
  initialValue?: boolean;
}

export const Checkbox: Component<Attributes> = ({ label, onChange, initialValue = false }) =>
  (
    <FormSection>
      <label className="gwc-checkbox">
        {label}
        <input
          type="checkbox"
          name="checked"
          onchange={(ev: any) => onChange(ev.target.checked)}
          defaultChecked={initialValue}
        />
        <span />
      </label>
    </FormSection>
  ) as VNode<Attributes>;
