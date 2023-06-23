import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ModalProcedures } from "../../../../components/Modal/ModalProcedures/ModalProcedures";
import { act } from "react-dom/test-utils";
import { Button } from "../../../../components/Button/Button";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
    texts: {},
    procedures: {
      profile: {
        name: 'Jorge Hernandez',
        items: [
          '200029578',
          'Utc distancia',
          'Licenciatura 334',
          'Administración de empresas'
        ]
      },
    }
}

const isShow = true;
const onClose = jest.fn();
const onNext = jest.fn();
const infoModal = {"profile":{"name":"Jorge Hernandez","items":["200029578","Utc distancia","Licenciatura 334","Administración de empresas"]},"information":["Contacto: 5530091000","Constancia: $480.00 - Constancia de Término 100%","Tipo de entrega: Únicamente en Formato Digital"],"file":[],"title":"Constancia de estudio","cost":"$480.00","detailId":"1204"};
const outside = jest.fn();

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <ModalProcedures isShow={isShow} onClose={onClose} onNext={onNext} infoModal={infoModal} outside={outside}/>
    </Provider>
  );
};

describe("Test <ModalProcedures/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  test("should close modal", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).first().props().onClick();
    });
    wrapper.update();
  });

  test("should click next modal", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).last().props().onClick();
    });
    wrapper.update();
  });

//   test("should close on outside modal", () => {
//     const wrapper = handleMount(initState);
//     wrapper.update();
//   });

});
