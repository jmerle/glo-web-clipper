import { Component, h, VNode } from 'hyperapp';
import { FormSection } from '../containers/FormSection';
import { LoadingIcon } from '../icons';

export enum StatusCheckState {
  Checking = 'checking',
  Success = 'success',
  Failed = 'failed',
}

interface Attributes {
  label: string;
  state: StatusCheckState;
}

export const StatusCheck: Component<Attributes> = ({ label, state }) => {
  const classes = ['gwc-status-check', `gwc-status-check-${state}`];

  let icon;
  if (state === StatusCheckState.Checking) {
    icon = LoadingIcon;
  } else if (state === StatusCheckState.Success) {
    icon = '✔';
  } else if (state === StatusCheckState.Failed) {
    icon = '✗';
  }

  return (
    <FormSection>
      <div class={classes.join(' ')}>
        {icon} {label}
      </div>
    </FormSection>
  ) as VNode<Attributes>;
};
