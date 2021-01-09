import { Injectable } from '@angular/core';
import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../shared.state';

const APP_PREFIX = 'SOCIAL-NETWORK-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  static initStateFromLocalStorage(
    reducer: ActionReducer<AppState>
  ): ActionReducer<AppState> {
    return function (state, action) {
      const newState = reducer(state, action);
      if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
        return { ...newState, ...LocalStorageService.loadInitialState() };
      }
      return newState;
    };
  }

  setItem(key: string, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  removeItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
