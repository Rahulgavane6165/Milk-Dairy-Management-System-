// state/viewState.js

import { atom } from 'recoil';

export const currentViewState = atom({
  key: 'currentViewState',
  default: 'home', // Default view
});
