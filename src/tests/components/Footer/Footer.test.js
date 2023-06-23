import React from "react";
import { mount } from "enzyme";
import { Footer } from "../../../components/Footer/Footer";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: {
    urlLogo: null,
    text: null,
    privacy: null,
    terms: null,
  },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Footer data={initState.data} />
    </Provider>
  );
};

describe("Test <Footer />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
