import React from 'react';
import { mount } from 'enzyme';
import Dashboard from '../../flow/Dashboard/Dashboard';
import { Provider, useDispatch } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { typesRequestErrors } from '../../constants/error.constant';
import { renderHook } from '@testing-library/react-hooks';
import { dashboardText } from '../../texts/dashboardText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockUseLocationValue = {
  pathname: "/testroute",
  search: '',
  hash: '',
  state: null
}
jest.mock('react-router', () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
  })
}));

let initState = {
  dashboard: {
    data: {
      qoutes: [
        {
          qoute: 'Hola Mund0'
        }
      ]
    },
    errors: {
      [typesRequestErrors.getDashboard]: {
        isError: false,
        msg: null
      }
    }
  },
  texts: {
    dashboard: {
      ...dashboardText
    }
  }
};

let store = mockStore(initState);

const { result } = renderHook(() => useDispatch())

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Dashboard  />
    </Provider>
  )
}

describe('Test <Dashboard />',() => {

  beforeEach(() => {
    
  })

  test('should init component',() => {
    const wrapper = handleMount(initState);
    expect(wrapper.find('.dashboardsuccess').exists()).toBe(true)
    expect(wrapper).toMatchSnapshot();
  })

  test('should show error',() => {
    initState = {
      ...initState,
      dashboard: {
        ...initState.dashboard,
        errors: {
          ...initState.dashboard.errors,
          [typesRequestErrors.getDashboard]: {
            isError: true,
            msg: 'Error'
          }
        }
      }
    }
    const wrapper = handleMount(initState);
    expect(wrapper.find('ScreenError').exists()).toBe(true);
  })

})