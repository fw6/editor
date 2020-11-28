import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  actions, Editor, EditorMenu, Store,
} from '../src';
import rootReducer from './reducers';
import middleware from './middleware';
import '../src/editor.css';

declare global {
  interface Window {
    [index: string]: any;
  }
}

const store: Store = createStore(
  rootReducer,
  applyMiddleware(
    ...middleware,
  ),
);
const stateKey = 'TEST';

window.store = store;
store.dispatch(actions.initEditorState(stateKey, true, '<p>Hello world!</p>', 0));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <EditorMenu standAlone stateKey={stateKey} />
      <Editor stateKey={stateKey} />
      <Editor stateKey={stateKey} />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
