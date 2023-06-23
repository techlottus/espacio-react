import React from "react";
import { mount } from "enzyme";
import MainProcedures from "../../../../flow/Procedures/components/Main/MainProcedures";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { ProceduresContext } from "../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";
import { ModalSolicitude } from "../../../../components/Modal/ModalSolicitude/ModalSolicitude";
import { CardProcedure } from "../../../../components/Card/CardProcedure";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Button } from "../../../../components/Button/Button";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { typesRequestErrors } from "../../../../constants/error.constant";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();

let initState = {
  procedures: {
    requestInquiryAll: null,
    proceduresAll: null,
    profile: null,
    errors: {
      [typesRequestErrors.getInformationProcedures]: {
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

const historyMock = {
  push: jest.fn(),
  location: { state: { status: {error: true} } },
  listen: jest.fn(),
};
const onClose = jest.fn().mockImplementation(() => {});

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{ onClose }}>
      <Provider store={store}>
        <BrowserRouter>
          <MainProcedures history={historyMock} />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <MainProcedures/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should close modal", () => {
    const wrapper = handleMount(initState);

    act(() => {
      wrapper.find(ModalSolicitude).props().onClose();
    });
    wrapper.update();
  });

  

  describe("should close sidebar", () => {
    test("should close on button", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Sidebar).props().onClose();
      });
      wrapper.update();
    });
    test("should close on outside of sidebar", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Sidebar).props().outside();
      });
      wrapper.update();
    });
  });

  test("should open sidebar", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(".procedures-btns").find(Button).last().props().onClick();
    });
    wrapper.update();
  });

  test("should redirect", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(".procedures-btns").find(Button).first().props().onClick();
    });
    wrapper.update();
  });

  describe("should back to dashboard and current page", () => {
    test("should back to dashboard", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Breadcrumb).props().onBack();
      });
      wrapper.update();
    });
    test("should go current page", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({ detail: "/" });
      });
      wrapper.update();
      //   expect(historyMock.push.mock.calls[0][0]).toEqual("/");
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({ detail: "/other" });
      });
      wrapper.update();
      //   expect(historyMock.push.mock.calls[0][0]).toEqual("/");
    });
  });
  test("should card redirect", () => {
    initState = {
      ...initState,
      procedures: {
        ...initState.procedures,
        proceduresAll: [
          {
            path: "/procedures-flows/study-record/information",
            icon: "description",
            type: "study-record",
            title: "Constancia de estudio",
            disabled: false,
            isContent: true,
            content: {
              text: "Documento con el que cada estudiante puede acreditar toda su trayectoria académica. En dicho documento se certifica oficialmente los estudios que una persona ha cursado con éxito.",
              price: "$480.00 - $590.00",
            },
          },
          {
            path: "/procedures-flows/certificate-study/information",
            icon: "star",
            type: "certificate-study",
            title: "Certificado de estudios",
            disabled: false,
            isContent: true,
            content: {
              text: "Documento donde se declara oficialmente que haz acreditado tu plan de estudios, este puede ser completo o parcial, incluye fechas, calificaciones, nombre de las unidades de aprendizaje, sellos y firmas de autoridades.",
              price: "$480.00 - $590.00",
            },
          },
        ],
      },
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(CardProcedure).first().props().onClick();
    });
    wrapper.update();
  });

  test("should open modal", () => {
    const wrapper = handleMount(initState);
  });
});
