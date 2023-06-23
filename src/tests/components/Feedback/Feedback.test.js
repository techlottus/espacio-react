import React from "react";
import { mount } from "enzyme";
import { Feedback } from "../../../components/Feedback/Feedback";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: {
    left: null,
    right: null,
    type: null,
    isTextEvent: null,
    textEvent: null,
  },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Feedback data={initState.data} />
    </Provider>
  );
};

describe("Test <Feedback />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
