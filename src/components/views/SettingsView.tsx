import { Component, h } from 'hyperapp';
import { Actions } from '../../app/actions';
import { State } from '../../app/state';
import { isAccessTokenValid } from '../../utils/api';
import { Button } from '../buttons/Button';
import { Box } from '../containers/Box';
import { Section } from '../containers/Section';
import { Input } from '../form/Input';
import { StatusCheck } from '../form/StatusCheck';
import { Column, Grid } from '../grid';

export const SettingsView: Component<{}, State, Actions> = () => (state, actions) => (
  <Box showSettingsButton={false}>
    <Section header="Settings">
      <Input
        label="Personal access token"
        placeholder="Put your personal access token here"
        value={state.newAccessToken}
        password={true}
        onChange={actions.setNewAccessToken}
      />

      {state.accessTokenChecksVisible && (
        <Grid>
          <Column>
            <StatusCheck label="board:read" state={state.boardReadState} />
          </Column>
          <Column>
            <StatusCheck label="board:write" state={state.boardWriteState} />
          </Column>
        </Grid>
      )}

      <p>
        A personal access token is required to retrieve information about your boards and create new cards. Please
        create one at{' '}
        <a href="https://app.gitkraken.com/pats/new" target="_blank">
          app.gitkraken.com/pats/new
        </a>{' '}
        and paste it in the input field above. The token should have the <code>board:read</code> and the{' '}
        <code>board:write</code> scopes.
      </p>

      <Button label="Save" disabled={!isAccessTokenValid(state.newAccessToken)} onClick={actions.saveNewAccessToken} />
    </Section>
  </Box>
);
