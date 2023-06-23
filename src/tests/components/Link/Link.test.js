import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Link } from "../../../components/Link/Link";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
  text: "",
  size: "",
  isBold: false,
  disabled: false,
  id: "",
  icon: "",
};
let onClick = jest.fn();

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Link data={data} onClick={onClick} />
    </Provider>
  );
};

describe("Test <Link/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
