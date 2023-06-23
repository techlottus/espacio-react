import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Navbar } from "../../../components/Navbar/Navbar";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
  urlLogo: "",
  iconLeft: "",
  iconsRight: null,
  zindex: 10,
};
let onRight = jest.fn();
let onLogo = jest.fn();

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Navbar data={data}  onRight={onRight} onLogo={onLogo} />
    </Provider>
  );
};

describe("Test <Navbar/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
