import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Label } from "../../../components/Label/Label";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
    id: "",
    type: "",
    title: "",
    icon: "",
    iconEvent: "",
    size: "",
    disabled: false,
}

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Label data={data} />
    </Provider>
  );
};

describe("Test <Label/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
