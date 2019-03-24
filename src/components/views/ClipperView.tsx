import { Component, h } from 'hyperapp';
import { Actions } from '../../app/actions';
import { State } from '../../app/state';
import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Box } from '../containers/Box';
import { Section } from '../containers/Section';
import { Checkbox } from '../form/Checkbox';
import { Input } from '../form/Input';
import { Select } from '../form/Select';
import { Column, Grid } from '../grid';
import { ExistingCardIcon, NewCardIcon } from '../icons';

export const ClipperView: Component<{}, State, Actions> = () => (state, actions) => (
  <Box>
    <Section header="What">
      <Grid>
        {state.clippers.map(clipper => (
          <Column>
            <IconButton
              icon={clipper.getIcon()}
              label={clipper.getLabel()}
              onClick={() => actions.runClipper(clipper)}
            />
          </Column>
        ))}
      </Grid>

      <Checkbox label="Include link to website" onChange={actions.setIncludeLink} />
    </Section>

    {state.currentImage !== null && (
      <Section header="Preview">
        <img src={state.currentImage} alt="Preview" className="gwc-preview" />
      </Section>
    )}

    <Section header="Where">
      <Grid>
        <Column>
          <IconButton icon={NewCardIcon} label="New card" onClick={console.log} selectable={true} selected={true} />
        </Column>
        <Column>
          <IconButton
            icon={ExistingCardIcon}
            label="Existing card"
            onClick={console.log}
            selectable={true}
            selected={false}
          />
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

      <Input label="Card name" onChange={console.log} />
    </Section>

    <Section header="Actions">
      <Button label="Save" onClick={console.log} />
    </Section>
  </Box>
);
