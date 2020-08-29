import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import "./form.css";
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import FormFour from './FormFour';
import reducers from '../reducers';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore((reducers), applyMiddleware(thunk));

  return (
    <div className="outer-container">
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/form/1" exact component={FormOne} />
            <Route path="/form/2" exact component={FormTwo} />
            <Route path="/form/3" exact component={FormThree} />
            <Route path="/form/4" exact component={FormFour} />
          </div>
        </BrowserRouter >
      </Provider>
    </div >


  )
};