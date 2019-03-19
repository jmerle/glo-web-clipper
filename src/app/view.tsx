import { h, View } from 'hyperapp';
import { Actions } from './actions';
import { State } from './state';

export const view: View<State, Actions> = (state, actions) => (
  <div class="gwc-box">
    <span class="gwc-close-btn">✕</span>

    <div class="gwc-header">What</div>

    <div class="gwc-grid">
      <div class="gwc-col">
        <button class="gwc-btn gwc-selection-btn">
          <svg viewBox="0 0 40 40">
            <path
              fill="transparent"
              stroke="white"
              stroke-linecap="round"
              stroke-width="5"
              d="M 10,10 L 30,30 M 30,10 L 10,30"
            />
          </svg>

          <div class="gwc-btn-label">Full page</div>
        </button>
      </div>
      <div class="gwc-col">
        <button className="gwc-btn gwc-selection-btn">
          <svg viewBox="0 0 40 40">
            <path
              fill="transparent"
              stroke="white"
              stroke-linecap="round"
              stroke-width="5"
              d="M 10,10 L 30,30 M 30,10 L 10,30"
            />
          </svg>

          <div className="gwc-btn-label">Visible page</div>
        </button>
      </div>
      <div class="gwc-col">
        <button className="gwc-btn gwc-selection-btn">
          <svg viewBox="0 0 40 40">
            <path
              fill="transparent"
              stroke="white"
              stroke-linecap="round"
              stroke-width="5"
              d="M 10,10 L 30,30 M 30,10 L 10,30"
            />
          </svg>

          <div className="gwc-btn-label">Selection</div>
        </button>
      </div>
    </div>

    <label class="gwc-checkbox">
      Include link to website
      <input type="checkbox" name="checked" />
      <span />
    </label>

    <div className="gwc-header">Preview</div>

    <img src="https://dummyimage.com/500x500/000/fff.png" alt="Preview" class="gwc-preview" />

    <div className="gwc-header">Where</div>

    <div className="gwc-grid">
      <div className="gwc-col">
        <button className="gwc-btn gwc-option-btn gwc-selected-btn">
          <svg viewBox="0 0 40 40">
            <path
              fill="transparent"
              stroke="white"
              stroke-linecap="round"
              stroke-width="5"
              d="M 10,10 L 30,30 M 30,10 L 10,30"
            />
          </svg>

          <div className="gwc-btn-label">New card</div>
        </button>
      </div>
      <div className="gwc-col">
        <button className="gwc-btn gwc-option-btn">
          <svg viewBox="0 0 40 40">
            <path
              fill="transparent"
              stroke="white"
              stroke-linecap="round"
              stroke-width="5"
              d="M 10,10 L 30,30 M 30,10 L 10,30"
            />
          </svg>

          <div className="gwc-btn-label">Existing card</div>
        </button>
      </div>
    </div>

    <div className="gwc-form-section">
      <label htmlFor="board-name">Board</label>
      <select id="board-name">
        <option disabled selected>Select a board</option>
        <option>Board 1</option>
        <option>Board 2</option>
        <option>Board 3</option>
        <option>Board 4</option>
        <option>Board 5</option>
      </select>
    </div>

    <div className="gwc-form-section">
      <label htmlFor="column-name">Column</label>
      <select id="column-name">
        <option disabled selected>Select a column</option>
        <option>Column 1</option>
        <option>Column 2</option>
        <option>Column 3</option>
        <option>Column 4</option>
        <option>Column 5</option>
      </select>
    </div>

    <div className="gwc-form-section">
      <label htmlFor="card-name">Card name</label>
      <input type="text" id="card-name" placeholder="Card name"/>
    </div>

    <div className="gwc-header">Actions</div>

    <button className="gwc-btn gwc-primary-btn">Save</button>
  </div>
);
