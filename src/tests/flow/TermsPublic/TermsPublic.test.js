import React from "react";
import { mount } from "enzyme";
import TermsPublic from "../../../flow/Terms/TermsPublic";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { Tabs } from "../../../components/Tabs/Tabs";
import { act } from "@testing-library/react";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();
window.dataLayer = {
  push: jest.fn(),
};
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

let initState = {
  texts: {},
  auth: null
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <TermsPublic history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <TermsPublic/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should click tabs", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Tabs).props().onTap({
        detail: "privacy",
      });
    });
    wrapper.update();
    act(() => {
      wrapper.find(Tabs).props().onTap({
        detail: "terms",
      });
    });
    wrapper.update();
  });

  test('should go back to dashboard', () => {
    initState= {
      ...initState,
      auth: true
    }
    const wrapper = handleMount(initState)

    act(() => {
      wrapper.find('.terms-arrow').props().onClick()
    })
    wrapper.update()
  })
});
