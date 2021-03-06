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
import { Textarea } from '../form/Textarea';
import { Column, Grid } from '../grid';
import { ExistingCardIcon, NewCardIcon } from '../icons';

export const ClipperView: Component<{}, State, Actions> = () => (state, actions) => {
  let canSave = !state.isSaving;

  if (state.currentImage === null && !state.includeLink) {
    canSave = false;
  }

  if (state.selectedBoard === null || state.selectedColumn === null) {
    canSave = false;
  }

  if (state.createNewCard && (state.cardName === null || state.cardName.trim().length === 0)) {
    canSave = false;
  }

  if (!state.createNewCard && state.selectedCard === null) {
    canSave = false;
  }

  return (
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

        <Textarea
          label="Description (optional)"
          placeholder="Optional description"
          value={state.description}
          onChange={actions.setDescription}
        />
      </Section>

      {state.currentImage !== null && (
        <Section header="Preview">
          <img src={state.currentImage} alt="Preview" className="gwc-preview" />
        </Section>
      )}

      <Section header="Where">
        <Grid>
          <Column>
            <IconButton
              icon={NewCardIcon}
              label="New card"
              onClick={() => actions.changeCreateNewCard(true)}
              selectable={true}
              selected={state.createNewCard}
            />
          </Column>
          <Column>
            <IconButton
              icon={ExistingCardIcon}
              label="Existing card"
              onClick={() => actions.changeCreateNewCard(false)}
              selectable={true}
              selected={!state.createNewCard}
            />
          </Column>
        </Grid>

        <Select
          label="Board"
          options={state.boards}
          selectedValue={state.selectedBoard}
          disabled={state.boardsLoading}
          placeholder={state.boardsLoading ? 'Loading...' : 'Select a board'}
          onChange={actions.selectBoard}
        />

        <Select
          label="Column"
          options={state.columns}
          selectedValue={state.selectedColumn}
          disabled={state.columnsLoading || state.selectedBoard === null}
          placeholder={
            state.columnsLoading
              ? 'Loading...'
              : state.selectedBoard === null
              ? 'Select a board first'
              : 'Select a column'
          }
          onChange={actions.selectColumn}
        />

        {state.createNewCard ? (
          <Input label="Card name" onChange={actions.setCardName} value={state.cardName} />
        ) : (
          <Select
            label="Card"
            options={state.cards}
            selectedValue={state.selectedCard}
            disabled={state.cardsLoading || state.selectedColumn === null}
            placeholder={
              state.cardsLoading
                ? 'Loading...'
                : state.selectedColumn === null
                ? 'Select a column first'
                : 'Select a card'
            }
            onChange={actions.setSelectedCard}
          />
        )}
      </Section>

      <Section header="Actions">
        <Button label="Save" disabled={!canSave} onClick={actions.save} />

        {state.savedCardUrl && (
          <a href={state.savedCardUrl} target="_blank" class="gwc-open-card-link">
            Open card in new tab
          </a>
        )}
      </Section>
    </Box>
  );
};
