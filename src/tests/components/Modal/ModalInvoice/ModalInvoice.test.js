import React, { createRef } from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ModalInvoice } from "../../../../components/Modal/ModalInvoice/ModalInvoice";
import { Button } from "../../../../components/Button/Button";
import { act } from "react-dom/test-utils";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
    texts: {},
}

const isShow = true;
const onClose = jest.fn().mockImplementation(() => {});
const saveModal = true;
const values = {state:"02"}
const outside = jest.fn();


let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <ModalInvoice isShow={isShow} onClose={onClose} saveModal={saveModal} values={values} outside={outside} />
    </Provider>
  );
};

describe("Test <ModalInvoice/>", () => {
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

});
