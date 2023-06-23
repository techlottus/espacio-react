import React from 'react';
import { mount } from 'enzyme';
import Payment from '../../../flow/Payment/Payment';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { typesRequestErrors } from '../../../constants/error.constant';
import { BrowserRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { Button } from '../../../components/Button/Button';
import { paymentText } from '../../../texts/paymentText';
import { dashboardText } from '../../../texts/dashboardText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn()
window.dataLayer = {
  push: jest.fn()
}

const historyMock = { block: jest.fn(), location: {}, listen: jest.fn() };
const handleSteps = jest.fn().mockImplementation(() => {});

let initState = {
  payment: {
    selectConcept: null,
    concepts: null,
    isInvoice: true,
    invoices: null,
    errors: {
      [typesRequestErrors.getConcepts]: {
        isError: false,
        msg: null
      },
      [typesRequestErrors.emptyConcepts]: {
        isError: false,
        msg: null
      },
      [typesRequestErrors.deleteConcept]: {
        isError: false,
        msg: null
      },
      [typesRequestErrors.getInvoices]: {
        isError: false,
        msg: null
      },
      [typesRequestErrors.deleteInvoice]: {
        isError: false,
        msg: null
      },
    }
  },
  texts: {
    payment: {
      ...paymentText
    },
    dashboard: {
      ...dashboardText
    }
  }
};

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Payment history={historyMock} />
      </BrowserRouter>
    </Provider>
  )
}

describe('Test <Payment /> ',() => {

  test('should init component',() => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount()
   
  })

  describe('should fail ',() => {
    it('without concepts',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          errors: {
            ...initState.payment.errors,
            [typesRequestErrors.getConcepts]: {
              isError: true,
              msg: 'error'
            }
          }
        }
      }
      const wrapper = handleMount(initState);
      expect(wrapper.find('ScreenError').exists()).toBe(true);
    })

    it('empty concepts',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          errors: {
            ...initState.payment.errors,
            [typesRequestErrors.getConcepts]: {
              isError: false,
              msg: 'error'
            },
            [typesRequestErrors.emptyConcepts]: {
              isError: true,
              msg: 'error'
            }
          }
        }
      }
      const wrapper = handleMount(initState);
      expect(wrapper.find('ScreenError').exists()).toBe(true);
    })

    
  })

  test('should show modal payment',() => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {},
        errors: {
          ...initState.payment.errors,
          [typesRequestErrors.emptyConcepts]: {
            isError: false,
            msg: 'error'
          }
        }
      }
    } 
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find('.next').find(Button).props().onClick();
    })
    wrapper.update();
    
  })

  test('should next stage tax data',() => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {},
        invoices: [
          {
            "id": 15,
            "userId": 12345,
            "businessName": "A very very very very very very large Company Name",
            "rfc": "111111111111",
            "curp": "XXXXXXYDD",
            "email": "email@wize.com",
            "address": {
              "street": "Benito Juares #123",
              "neighborhood": "Centro",
              "city": "Celaya",
              "state": "11",
              "zipCode": "123123"
            },
            "cfdiUsage": "G03",
            "personType": 2,
            "default": false,
            "isDefault": false
          }
        ],
        editForm: null,
      }
    } 
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find('.listtaxaction').last().find(Button).props().onClick();
    })
    wrapper.update();
  })

})