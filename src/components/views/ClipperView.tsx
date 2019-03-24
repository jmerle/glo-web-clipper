import { Component, h } from 'hyperapp';
import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Box } from '../containers/Box';
import { Section } from '../containers/Section';
import { Checkbox } from '../form/Checkbox';
import { Input } from '../form/Input';
import { Select } from '../form/Select';
import { Column, Grid } from '../grid';
import { ExistingCardIcon, FullPageIcon, NewCardIcon, SelectionIcon, VisiblePageIcon } from '../icons';

export const ClipperView: Component = () => (
  <Box>
    <Section header="What">
      <Grid>
        <Column>
          <IconButton icon={VisiblePageIcon} label="Visible page"/>
        </Column>
        <Column>
          <IconButton icon={FullPageIcon} label="Full page"/>
        </Column>
        <Column>
          <IconButton icon={SelectionIcon} label="Selection"/>
        </Column>
      </Grid>

      <Checkbox label="Include link to website"/>
    </Section>

    <Section header="Preview">
      <img src="https://dummyimage.com/500x500/000/fff.png" alt="Preview" className="gwc-preview"/>
    </Section>

    <Section header="Where">
      <Grid>
        <Column>
          <IconButton icon={NewCardIcon} label="New card" selectable={true} selected={true}/>
        </Column>
        <Column>
          <IconButton icon={ExistingCardIcon} label="Existing card" selectable={true} selected={false}/>
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

      <Input label="Card name"/>
    </Section>

    <Section header="Actions">
      <Button>Save</Button>
    </Section>
  </Box>
);
