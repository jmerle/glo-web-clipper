import { h, View } from 'hyperapp';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { FormSection } from '../components/FormSection';
import { Column, Grid } from '../components/grid';
import { Header } from '../components/Header';
import { IconButton } from '../components/IconButton';
import { CrossIcon } from '../components/icons';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Actions } from './actions';
import { State } from './state';

export const view: View<State, Actions> = (state, actions) => (
  <div class="gwc-box">
    <span class="gwc-close-btn">✕</span>

    <Header>What</Header>

    <Grid>
      <Column>
        <IconButton icon={CrossIcon} label="Full page" />
      </Column>
      <Column>
        <IconButton icon={CrossIcon} label="Visible page" />
      </Column>
      <Column>
        <IconButton icon={CrossIcon} label="Selection" />
      </Column>
    </Grid>

    <Checkbox label="Include link to website" />

    <Header>Preview</Header>

    <img src="https://dummyimage.com/500x500/000/fff.png" alt="Preview" class="gwc-preview" />

    <Header>Where</Header>

    <Grid>
      <Column>
        <IconButton icon={CrossIcon} label="New card" selectable={true} selected={true} />
      </Column>
      <Column>
        <IconButton icon={CrossIcon} label="Existing card" selectable={true} selected={false} />
      </Column>
    </Grid>

    <Select
      label="Board"
      placeholder="Select a board"
      options={[...new Array(5)].map((v, i) => ({ value: `board-${i + 1}`, label: `Board ${i + 1}` }))}
    />

    <Select
      label="Column"
      placeholder="Select a column"
      options={[...new Array(5)].map((v, i) => ({ value: `column-${i + 1}`, label: `Column ${i + 1}` }))}
    />

    <Input label="Card name" />

    <Header>Actions</Header>

    <Button>Save</Button>
  </div>
);
