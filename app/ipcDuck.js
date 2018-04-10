import { ipcRenderer } from 'electron';

import Duck from 'extensible-duck';

export default new Duck({
  namespace: 'websign',
  types: ['LOAD'],
  initialState: [],
  reducer: (state, { type, payload }, { types }) => {
    switch (type) {
      case types.LOAD:
        return payload;
      default:
        return state;
    }
  },
  creators: ({ types }) => ({
    load: () => ({
      type: types.LOAD,
      payload: ipcRenderer.sendSync(types.LOAD)
    })
  })
});
