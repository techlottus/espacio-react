import React from "react";
import { mount } from "enzyme";
import AcademicHistoryInformation from "../../../../flow/Procedures/Flows/AcademicHistory/AcademicHistoryInformation";
import { Provider } from "react-redux";
import { typesRequestErrors } from "../../../../constants/error.constant";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ProceduresContext } from "../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import { Button } from "../../../../components/Button/Button";
import {
  fileSuccessMock,
  proceduresAcademicHistoryMock,
} from "../../../../fixtures/academicHistoryDocumentsFixture";
import { Upload } from "../../../../components/Upload/Upload";
import { Input } from "../../../../components/Input/Input";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.scrollTo = jest.fn();

let initState = {
  proceduresAcademicHistory: {
    information: {
      optionsCampusDelivery: [],
      optionsTypeDelivery: [],
      profile: null,
      phone: null,
    },
    data: {
      selectCampusDelivery: null,
      selectTypeDelivery: null,
      comments: null,
      phone: null,
    },
    document: null,
    errors: {
      [typesRequestErrors.postAcademicHistory]: {
        isError: false,
        msg: null,
      },
    },
  },
  texts: {
    procedures: {
      phoneText: "666",
    },
  },
};

const setSteps = jest.fn().mockImplementation(() => {});
const setIsModal = jest.fn().mockImplementation(() => {});
const setInfoModal = jest.fn().mockImplementation(() => {});
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

const handleMount = (initState) => {
  let store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{ setSteps, setIsModal, setInfoModal }}>
      <Provider store={store}>
        <BrowserRouter>
          <AcademicHistoryInformation history={historyMock} />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <AcademicHistoryDocuments/>", () => {
  beforeEach(() => {});

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should go to next page", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper
        .find(".academichistorybtns")
        .find(Button)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();
  });

  describe("should reset flow", () => {
    test("should reset flow and back to main page", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper
          .find(".academichistorybtns")
          .find(Button)
          .first()
          .props()
          .onClick();
      });
      wrapper.update();
    });
  });

  test('should set values of input', () => {
      const wrapper = handleMount(initState);
      act(() => {
          wrapper.find(".academichistoryitem").find(Input).props().eventKeyPress()
      })
      wrapper.update()
  })
});
