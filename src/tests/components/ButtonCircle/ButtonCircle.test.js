import React from "react";
import { mount } from "enzyme";
import { ButtonCircle } from "../../../components/ButtonCircle/ButtonCircle";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: {
    id: null,
    type: null,
    title: null,
    size: null,
    icon: null,
    lyIcon: null,
    disabled: null,
    isExpand: null,
  },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <ButtonCircle data={initState.data} />
    </Provider>
  );
};

describe("Test <ButtonCircle />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
