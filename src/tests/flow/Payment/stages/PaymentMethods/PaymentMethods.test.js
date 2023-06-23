import React from 'react';
import { mount } from 'enzyme';
import PaymentMethods from '../../../../../flow/Payment/stages/PaymentMethods/PaymentMethods';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { PaymentContext } from '../../../../../flow/Payment/PaymentContext';
import { act } from '@testing-library/react';
import { Button } from '../../../../../components/Button/Button';
import { CardPayment } from '../../../../../components/Card/CardPayment';
import { paymentText } from '../../../../../texts/paymentText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  payment: {
    selectConcept: {},
    isInvoice: false
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

const historyMock = { replace: jest.fn(),push: jest.fn(), location: {}, listen: jest.fn() };
const handleSteps = jest.fn().mockImplementation(() => {});

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <PaymentContext.Provider  value={{handleSteps}}>
      <Provider store={store}>
        <PaymentMethods history={historyMock} />
      </Provider>
    </PaymentContext.Provider>
    
  )
}

describe('Test <PaymentMethods/>',() => {

  test('should init component',() => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  })

  describe('should action back ',() => {
    test('with invoice',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          isInvoice: true
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Button).props().onClick();
      })
      expect(historyMock.push.mock.calls[0][0]).toEqual('/payment/tax-data');
    })

    test('without invoice ',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          isInvoice: false
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Button).props().onClick();
      })
      expect(historyMock.push.mock.calls[0][0]).toEqual('/payment/concept');
    })
  })

  test('should card payment action handle check',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(CardPayment).first().props().onCheck();
    })
    wrapper.update();
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