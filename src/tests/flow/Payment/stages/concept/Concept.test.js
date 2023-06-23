import React from 'react';
import { mount } from 'enzyme';
import Concept from '../../../../../flow/Payment/stages/Concept/Concept';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { PaymentContext } from '../../../../../flow/Payment/PaymentContext';
import { paymentResponseConcepts } from '../../../../../fixtures/paymentFixture';
import { act } from 'react-dom/test-utils';
import { typesRequestErrors } from '../../../../../constants/error.constant';
import { Toggle } from '../../../../../components/Toggle/Toggle';
import { ModalToggle } from '../../../../../components/Modal/ModalToggleConcept/ModalToggleConcept';
import { ModalConceptDelete } from '../../../../../components/Modal/ModalConceptDelete/ModalConceptDelete';
import { Button } from '../../../../../components/Button/Button';
import { BrowserRouter } from 'react-router-dom';
import { Feedback } from '../../../../../components/Feedback/Feedback';
import { paymentText } from '../../../../../texts/paymentText';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

window.dataLayer = {
  push: jest.fn()
}

let initState = {
  payment: {
    selectConcept: null,
    isInvoice: true,
    concepts: null,
    errors: {
      [typesRequestErrors.getConcepts]: {
        isError: false,
        msg: null
      },
      [typesRequestErrors.deleteConcept]: {
        isError: false,
        msg: null
      }
    }
  },
  texts: {
    payment: {
      ...paymentText
    }
  }
};

const handleSteps = jest.fn().mockImplementation(() => {});

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <PaymentContext.Provider  value={{handleSteps}}>
      <Provider store={store}>
        <BrowserRouter>
          <Concept history={historyMock}  />
        </BrowserRouter>
      </Provider>
    </PaymentContext.Provider>
  )
}

describe('Test <Concept/>',() => {

  test('should init component',() => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  })

  describe('should load concepts',() => {
    test('with null',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          concepts: null
        }
      }
      const wrapper = handleMount(initState);
      expect(wrapper.find('CardDetail').exists()).toBe(false);
    })

    test('without null',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          concepts: [...paymentResponseConcepts]
        }
      }
      const wrapper = handleMount(initState);
      expect(wrapper.find('CardDeatil').exists()).toBe(true);
    })
  })

  describe('should run event ',() => {
    test('handleCheck',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          concepts: [...paymentResponseConcepts]
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find('CardDeatil').first().props().onCheck();
      })
      wrapper.update();
      expect( wrapper.find('CardDeatil').first().props().data.checked).toBe(true);
    })
  })

  test('should set concept default when back',() => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {
          id: paymentResponseConcepts[0].transactionNumber
        }
      }
    }
    const wrapper = handleMount(initState);
    expect( wrapper.find('CardDeatil').first().props().data.checked).toBe(true);
  })

  describe('should action modal',() => {
    test('pass false to true',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Toggle).props().onSwitch({
          detail: true
        });
      })
      wrapper.update();
      
    })
    test('pass true to false',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          isInvoice: true
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Toggle).props().onSwitch({
          detail: false
        });
      })
      wrapper.update();
      expect(wrapper.find(ModalToggle).props().isShow).toBe(true);
    })

    test('action back',() => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Toggle).props().onSwitch({
          detail: false
        });
        wrapper.find(ModalToggle).props().onCancel();
      });
      wrapper.update();
      expect(wrapper.find(Toggle).props().data.status).toBe(true);
      expect(wrapper.find(ModalToggle).props().isShow).toBe(false);
    })

    test('action next',() => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Toggle).props().onSwitch({
          detail: false
        });
        wrapper.find(ModalToggle).props().onNext();
      });
      wrapper.update();
      expect(wrapper.find(ModalToggle).props().isShow).toBe(false);
    })
  })

  test('should delete concept action close',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find('CardDeatil').first().props().onAction();
    })
    wrapper.update();
    expect(wrapper.find(ModalConceptDelete).props().isShow).toBe(true);
    act(() => {
      wrapper.find(ModalConceptDelete).props().onClose();
    })
    wrapper.update();
    expect(wrapper.find(ModalConceptDelete).props().isShow).toBe(false);
  })

  test('should delete concept action next',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find('CardDeatil').first().props().onAction();
    })
    wrapper.update();
    expect(wrapper.find(ModalConceptDelete).props().isShow).toBe(true);
    act(() => {
      wrapper.find(ModalConceptDelete).props().handleDelete();
    })
    wrapper.update();
    expect(wrapper.find(ModalConceptDelete).props().isShow).toBe(false);
  })

  describe('should action flow',() => {
    test('next with is invoice',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          selectConcept: {
            id: paymentResponseConcepts[0].transactionNumber
          },
          isInvoice: true
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find('.next').find(Button).props().onClick();
      })
      expect(historyMock.push.mock.calls[0][0]).toEqual('/payment/tax-data');
    })

    test('back with is not invoice',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          selectConcept: {
            id: paymentResponseConcepts[0].transactionNumber
          },
          isInvoice: false,
          errors:{
            [typesRequestErrors.deleteConcept]: {
              isError: true,
              msg: 'error en conceptos'
            },
          }
        }
      }
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find('.next').find(Button).props().onClick();
      })
      wrapper.update();
      expect(historyMock.push.mock.calls[0][0]).toEqual('/payment/methods');
    })

    test('close modal delete concept',() => {
      initState = {
        ...initState,
        payment: {
          ...initState.payment,
          selectConcept: {
            id: paymentResponseConcepts[0].transactionNumber
          },
          isInvoice: false,
          errors:{
            [typesRequestErrors.deleteConcept]: {
              isError: true,
              msg: 'error en conceptos'
            },
          }
        }
      }
      const wrapper = handleMount(initState);
      
    })
  })

})