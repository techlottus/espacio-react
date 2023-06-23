import React from "react";
import { mount } from "enzyme";
import AcademicHistoryDocuments from "../../../../../flow/Procedures/Flows/AcademicHistory/AcademicHistoryDocuments";
import { Provider } from "react-redux";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ProceduresContext } from "../../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import { Button } from "../../../../../components/Button/Button";
import {
  fileSuccessMock,
  proceduresAcademicHistoryMock,
} from "../../../../fixtures/academicHistoryDocumentsFixture";
import { Upload } from "../../../../components/Upload/Upload";

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
      uploadText: "hola",
      feedBackText: "hola",
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
          <AcademicHistoryDocuments history={historyMock} />
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

  test("should setNext true", () => {
    initState = {
      ...initState,
      proceduresAcademicHistory: {
        ...initState.proceduresAcademicHistory,
        information: {
          ...proceduresAcademicHistoryMock.information,
        },
        data: {
          ...proceduresAcademicHistoryMock.data,
        },
      },
    };
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

    expect(setIsModal).toHaveBeenCalled();
    expect(setInfoModal).toHaveBeenCalled();
  });

  test("Should return to academy history info", () => {
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

  describe("Should upload", () => {
    test("should come correct", async () => {
      const wrapper = handleMount(initState);
      await act(async () => {
        wrapper
          .find(Upload)
          .props()
          .onFile({
            detail: {
              ...fileSuccessMock,
            },
          });
      });
      wrapper.update();
    });
  });
});
