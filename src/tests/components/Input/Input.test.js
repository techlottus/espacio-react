import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Input } from "../../../components/Input/Input";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
    label: "",
    name: "",
    type: "",
    typeButton: "",
    maxlength: "",
    onPaste: true,
    placeholder: "",
    autocomplete: "",
    disabled: false,
    alphanumeric: false,
    alphabetical: true,
    onlyNumbers: false,
    upperCase: false,
    pattern: "",
}

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Input data={data} />
    </Provider>
  );
};

describe("Test <Input/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
