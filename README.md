# Redux Utils ⚛ ️🖖

> Type safe utils for redux actions

# Getting started

Let's demonstrate simple usage with good Counter example:

1.  Create Type-safe Redux Actions

```tsx
// actions.ts
import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD'

export const Actions = {
  increment: () => createAction(INCREMENT),
  decrement: () => createAction(DECREMENT),
  incrementIfOdd: () => createAction(INCREMENT_IF_ODD),
}

// we leverage TypeScript token merging, so our consumer can use `Actions` for both runtime and compile time types 💪
export type Actions = ActionsUnion<typeof Actions>
```

## Licensing

[MIT](./LICENSE.md)