import React, { createRef } from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Menu } from "../../../components/Menu/Menu";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
  items: null,
  disabledBtnClose: false,
  isShow: true,
};
let onClose = jest.fn();
let onCard = jest.fn();
let outside = jest.fn();
let menuRef = "";

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Menu
        data={data}
        onClose={onClose}
        onCard={onCard}
        outside={outside}
        menuRef={menuRef}
      />
    </Provider>
  );
};

describe("Test <Menu/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  // test("should put window to 991", () => {
  //   initState = {
  //     menuRef: {
  //       ...initState.menuRef,
  //     },
  //   };
  //   window.innerWidth = 991;
  //   const wrapper = handleMount(initState);
  //   wrapper.update();
  // });
});
