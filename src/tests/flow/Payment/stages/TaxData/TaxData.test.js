import React from 'react';
import { mount } from 'enzyme';
import TaxData from '../../../../../flow/Payment/stages/TaxData/TaxData';
import { Provider} from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { PaymentContext } from '../../../../../flow/Payment/PaymentContext';
import { BrowserRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { paymentText } from '../../../../../texts/paymentText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  payment: {
    invoices: null,
    selectConcept: {},
    editForm: null
  },
  texts: {
    payment: {
      ...paymentText
    }
  }
};

window.scrollTo = jest.fn()
window.dataLayer = {
  push: jest.fn()
}

const historyMock = { replace: jest.fn(), location: {}, listen: jest.fn() };
const handleSteps = jest.fn().mockImplementation(() => {});

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <PaymentContext.Provider  value={{handleSteps}}>
      <Provider store={store}>
        <BrowserRouter>
          <TaxData history={historyMock} />
        </BrowserRouter>
      </Provider>
    </PaymentContext.Provider>
  )
}

describe('Test <TaxData/>',() => {

  test('should init component',() => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ListTax').exists()).toBe(true);
    wrapper.unmount();
  })

  describe('should action list taxes for add form',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find('ListTax').props().addForm()
    })
    wrapper.update();
    expect(wrapper.find('FormsTax').exists()).toBe(true);


  })

  test('should back in stage one',() => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: null
      }
    }
    const wrapper = handleMount(initState);
    wrapper.update();
    expect(historyMock.replace.mock.calls[0][0]).toEqual('/payment/concept');
  })

  


})