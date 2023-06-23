import React from "react";
import { mount } from "enzyme";
import { ModalExit } from "../../../../components/Modal/ModalExit/ModalExit";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

let initState = {
  texts: {},
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <ModalExit history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <ModalExit />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
  describe("set isModal", () => {
    test("set isModal to true", () => {
      const wrapper = handleMount(initState);
    });
  });
});
