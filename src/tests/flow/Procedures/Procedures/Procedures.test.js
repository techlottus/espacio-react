import React from "react";
import { mount } from "enzyme";
import Procedures from "../../../../flow/Procedures/Procedures";
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
import { last } from "rxjs";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import { typesRequestErrors } from "../../../../constants/error.constant";
import { ModalAccordion } from "../../../../components/Modal/ModalAccordion/ModalAccordion";
import { ModalProcedures } from "../../../../components/Modal/ModalProcedures/ModalProcedures";

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
  location: { state: { status: true } },
  listen: jest.fn(),
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider>
      <Provider store={store}>
        <BrowserRouter>
          <Procedures history={historyMock} />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <Procedures/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("Should retrieve procedures information", () => {
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
    wrapper.update()
  });
  test("should close modal accordion", () => {
    const wrapper = handleMount(initState);

    act(() => {
      wrapper.find(ModalAccordion).props().onClose();
    });
    wrapper.update();
  });

  describe("Should click on Modal Procedures", () => {
    test("Should close modal procedures", () => {
      const wrapper = handleMount(initState);

      act(() => {
        wrapper.find(ModalProcedures).props().onClose();
      });

      wrapper.update();
    });

    test("Should handle request", () => {
      const wrapper = handleMount(initState);

      act(() => {
        wrapper.find(ModalProcedures).props().onNext();
      });
      wrapper.update();
    });
  });
});
