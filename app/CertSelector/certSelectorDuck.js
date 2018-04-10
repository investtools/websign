import { ipcRenderer } from 'electron';

import ipcDuck from '../ipcDuck';

export default ipcDuck.extend({
  store: 'certSelector',
  initialState: { origin: '' },
  types: ['SELECT', 'SIGN', 'CANCEL'],
  reducer: (state, { type, payload }, { types }) => {
    switch (type) {
      case types.SELECT:
        return { ...state, selected: payload };
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    select: id => ({ type: types.SELECT, payload: id }),
    sign: () => (dispatch, getState) => {
      ipcRenderer.send(types.SIGN, getState().certSelector.selected);
    },
    cancel: () => (dispatch, getState) => {
      ipcRenderer.send(types.CANCEL, getState().certSelector.selected);
    }
  })
});
