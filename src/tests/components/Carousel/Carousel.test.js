import React from "react";
import { mount } from "enzyme";
import { Carousel } from "../../../components/Carousel/Carousel";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initState;
let data = {
  slides: null,
  width: null,
  height: null,
  size: null,
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Carousel data={data} />
    </Provider>
  );
};

describe("Test <Carousel />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should put width to 180px", () => {
    data = {
      ...data,
      height: '180px'
    }
    window.innerWidth = 990;

    const wrapper = handleMount(initState);

    wrapper.update();

    window.dispatchEvent(new Event("resize"));

    expect(wrapper.props().children.props.data.height).toBe("180px");
  });
});
