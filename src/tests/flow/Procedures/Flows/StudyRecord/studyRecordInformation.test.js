import React from "react";
import { mount } from "enzyme";
import { Provider} from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { proceduresText } from "../../../../../texts/proceduresText";
import StudyRecordInformation from "../../../../../flow/Procedures/Flows/StudyRecord/StudyRecordInformation";
import { BrowserRouter } from "react-router-dom";
import { ProceduresContext } from "../../../../../flow/Procedures/ProceduresContext";
import { dataStudyRecordWihtoutInfoMock } from "../../../../../fixtures/procedures/studyRecordFixture";
import { infoProceduresMock } from "../../../../../fixtures/procedures/procedureFixture";
import { Input } from "../../../../../components/Input/Input";
import { act } from "react-dom/test-utils";
import { CardProfile } from "../../../../../components/Card/CardProfile";
import { Select } from "../../../../../components/Select/Select";
import { tokenWithDelivaryMock } from "../../../../../fixtures/tokenFixture";
import { Checkbox } from "../../../../../components/Checkbox/Checkbox";
import { getValuesOfAuth } from "../../../../../helpers/auth";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { Button } from "../../../../../components/Button/Button";
import { ModalConstants } from "../../../../../components/Modal/ModalConstants/ModalConstants";
//import { useFormBuilder } from "../../../../../hooks/useForm";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../../../hooks/useForm',() => ({
  useFormBuilder: () => {
    return [
      {
        get: () => {
          return {
            setValue: () => {}
          }
        }
      },
      jest.fn().mockImplementation(() => {}),
      {
        value: {},
        valid: false
      },
      (nuewState) => {},
      {},
      jest.fn().mockImplementation(() => {}),
    ]
  }
}))

jest.mock('../../../../../helpers/auth',() => ({
  getValuesOfAuth: () => {
    return {
      modality: 'withDelivery'
    }
  }
}));

let initState = {
  texts: {
    procedures: {
      ...proceduresText,
    },
  },
  login: {
    accessToken: tokenWithDelivaryMock
  },
  procedureStudyRecord: {
    ...dataStudyRecordWihtoutInfoMock
  },
  procedures: {
    ...infoProceduresMock
  }
};

window.scrollTo = jest.fn()
const handleSteps = jest.fn().mockImplementation(() => {});

const handleMount = (initState) => {
  let store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{handleSteps}}>
      <Provider store={store}>
        <BrowserRouter>
          <StudyRecordInformation />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <StudyRecordInformation />", () => {

  beforeEach(() => {
    
  }) 


  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should not render the profile ", () => {
    const initWithoutProfile = {
      ...initState,
      procedures: {
        ...initState.procedures,
        profile: null
      }
    }
    const wrapper = handleMount(initWithoutProfile);
    expect(wrapper.find(CardProfile).exists()).toBe(false);
  });

  test("should form valid with campus ", () => {
    initState = {
      ...initState,
      procedureStudyRecord: {
        ...initState.procedureStudyRecord,
        data: {
          ...initState.procedureStudyRecord.data,
          selectTypeDelivery: '1'
        }
      }
    }
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Input).first().props().eventKeyPress({
        detail: {
          value:'5512345678'
        }
      })
      wrapper.find(Select).forEach((select,index) => {
        select.props().onClick({
          detail: '2'
        })
      })
    })
    //jest.spyOn(React, "useState").mockImplementation([{},() => {}]);
    wrapper.update();
    act(() => {
      wrapper.find(Button).last().props().onClick();
    })
    expect(wrapper).toMatchSnapshot();
    
  });

  test("should form valid without campus ", () => {
   
   
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Input).first().props().eventKeyPress({
        detail: {
          value:'5512345678'
        }
      })
      wrapper.find(Select).forEach((select,index) => {
        select.props().onClick({
          detail: '1'
        })
      })
      wrapper.find(Checkbox).props().onCheck({
        detail: true
      })
      wrapper.find(Input).last().props().eventKeyPress({
        detail: {
          value:'Hola Mundo'
        }
      })
    })
    expect(wrapper).toMatchSnapshot();
  });

  test('should back main procedures',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).first().props().onClick();
    })
  })

  test('should open study record notice',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Feedback).find('.studyrecordnoticelink').props().onClick();
    })
  })

  test('should close study record notice',() => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(ModalConstants).props().onClose();
    })
  })

  describe('should back of documentation',() => {
    test('wiht compus',() => {
      initState = {
        ...initState,
        procedureStudyRecord: {
          ...initState.procedureStudyRecord,
          data: {
            ...initState.procedureStudyRecord.data,
            phone: '5512345678',
            selectTypeRecord: '1',
            selectTypeDelivery: '1',
            selectCampusDelivery: '1'
          }
        }
      }
      const wrapper = handleMount(initState);
      
    })

    test('without campus',() => {
      initState = {
        ...initState,
        procedureStudyRecord: {
          ...initState.procedureStudyRecord,
          data: {
            ...initState.procedureStudyRecord.data,
            phone: '5512345678',
            selectTypeRecord: '1',
            selectTypeDelivery: '2',
          }
        }
      }
      const wrapper = handleMount(initState);
     
    })
  })

  test('should not found profile',() => {
    initState = {
      ...initState,
      procedureStudyRecord: {
        ...initState.procedureStudyRecord,
        information: {
          ...initState.procedureStudyRecord.information,
          profile: null
        }
      }
    }
    const wrapper = handleMount(initState);
    expect(wrapper.find(CardProfile).exists()).toBe(false);
  })

});
