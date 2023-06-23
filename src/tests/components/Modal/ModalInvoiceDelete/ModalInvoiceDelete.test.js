import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ModalInvoiceDelete } from "../../../../components/Modal/ModalInvoiceDelete/ModalInvoiceDelete";
import { act } from "react-dom/test-utils";
import { Button } from "../../../../components/Button/Button";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
    texts: {},
}

const isShow = true;
const onClose = jest.fn();
const saveModal = true;
const outside = jest.fn();


let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <ModalInvoiceDelete isShow={isShow} onClose={onClose} saveModal={saveModal} outside={outside}/>
    </Provider>
  );
};

describe("Test <ModalInvoiceDelete/>", () => {
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
