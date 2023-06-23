import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Loading from "../../../components/Loading/Loading";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  loading: { isShow: true },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Loading />
    </Provider>
  );
};

describe("Test <Loading/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  test("should hidden false", () => {
    initState = { loading: { isShow: false } };
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
