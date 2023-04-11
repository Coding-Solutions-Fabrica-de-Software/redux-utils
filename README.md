# Redux Utils ⚛ ️🖖

> Type safe utils for redux actions

# Getting started

First install this libraries:

```prompt
npm i @coding_solutions/redux-utils react-redux @reduxjs/toolkit redux-saga 
```

Let's demonstrate simple usage with list people example:

1.  Create Type-safe Redux Actions

```tsx
// actions.ts
import { ActionsUnion, createAction } from '@coding_solutions/redux-utils'

export enum PeopleActionKeys {
  FETCH_LIST_PEOPLE_STARTED = '[PEOPLE] FETCH_LIST_PEOPLE_STARTED',
  FETCH_LIST_PEOPLE_SUCCEEDED = '[PEOPLE] FETCH_LIST_PEOPLE_SUCCEEDED',
  FETCH_LIST_PEOPLE_FAILED = '[PEOPLE] FETCH_LIST_PEOPLE_FAILED',
}

export const PeopleActions = {
  fetchListPeople: (search: ISearchConfig): fetchListPeopleAction => 
    createAction(PeopleActionKeys.FETCH_LIST_PEOPLE_STARTED, search),
  fetchListPeopleSucceded: (result: IPeople[]): fetchListPeopleActionSucceded => 
    createAction(PeopleActionKeys.FETCH_LIST_PEOPLE_SUCCEEDED, result),
  fetchListPeopleFailed: (result: IErrorDefinition): fetchListPeopleActionFailed => 
    createAction(PeopleActionKeys.FETCH_LIST_PEOPLE_FAILED, result),
}

export type fetchListPeopleAction = Action<
  PeopleActionKeys.FETCH_LIST_PEOPLE_STARTED,
  ISearchConfig
>;

export type fetchListPeopleActionSucceded = Action<
  PeopleActionKeys.FETCH_LIST_PEOPLE_SUCCEEDED,
  IPeople[]
>;

export type fetchListPeopleActionFailed = Action<
  PeopleActionKeys.FETCH_LIST_PEOPLE_FAILED,
  IErrorDefinition
>;

// we leverage TypeScript token merging, so our consumer can use `Actions` for both runtime and compile time types 💪
export type PeopleActionUnion = ActionsUnion<typeof PeopleActions>;
```

2. Create State File Definition Type

```tsx
// IPeopleState.ts

export interface IPeopleState {
  result: IPeople[];
  isLoading: boolean;
  error: IErrorDefinition;
}

```

3. Use Type-safe Redux Actions within Reducer

```tsx
// reducer.ts
import { Reducer } from 'react';
import { IPeopleState } from './IPeopleState';
import { PeopleActionUnion, PeopleActionKeys } from './actions';

const initialState: IPeopleState = {
  error: {
    data: [],
    success: false
  },
  result: [],
  isLoading: false
};

const reducer: Reducer<IPeopleState, PeopleActionUnion> = (state = initialState, action) => {
  switch (action.type) {
    case PeopleActionKeys.FETCH_LIST_PEOPLE_STARTED: {
      return {
        ...state,
        isLoading: true
      };
    }
    case PeopleActionKeys.FETCH_LIST_PEOPLE_SUCCEEDED: {
      // $ExpectPayload 'IPeople[]'

      return {
        ...state,
        result: action.payload,
        isLoading: false
      };
    }
    case PeopleActionKeys.FETCH_LIST_PEOPLE_FAILED: {
      // $ExpectPayload 'IErrorDefinition'

      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
}

export default reducer;
```

4. Now we can coonect our API with redux-sagas

```tsx
import { call, put } from 'redux-saga/effects';
import PeopleAPI from '@services/PeopleAPI';
import { fetchListPeopleAction, PeopleActions } from './action';

export function* fetchListPeople(action: fetchListPeopleAction) {
  try {
    const { data } = yield call(
      PeopleAPI.fetchListPeople,
      action.payload
    );

    yield put(PeopleActions.fetchLancePropostaSucceeded(data));
  } catch (e) {
    yield put(PeopleActions.fetchLancePropostaFailed(e.message));
  }
}
```

## Licensing

[MIT](./LICENSE.md)