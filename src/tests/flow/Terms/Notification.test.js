import React from 'react';
import { mount } from 'enzyme';
import Notification from '../../../layout/Terms/views/Notification';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { termsText } from '../../../texts/termsText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  texts: {
    terms: {
      ...termsText
    }
  }
};

let store = mockStore(initState);

window.dataLayer = {
  push: jest.fn()
}

const icon = 'person';
const text = 'Hola1w';

const wrapper = mount(
  <Provider store={store}>
    <Notification
      icon={icon}
      text={text}
    />
  </Provider>
)

describe('Test <Notification/>',() => {

  beforeEach(() => {
    store = mockStore(initState);
  })

  test('init component',() => {
    expect(wrapper).toMatchSnapshot();
  })

  test('should valid text ',() => {
    expect(wrapper.find('.icons').text()).toBe(icon);
    expect(wrapper.find('.content-text').text()).toBe(text);
  })
})