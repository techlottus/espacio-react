import React from "react";
import { mount } from "enzyme";
import TermsBtns from "../../../layout/Terms/views/TermsBtns";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { Button } from "../../../components/Button/Button";
import { Toggle } from "../../../components/Toggle/Toggle";
import { termsText } from "../../../texts/termsText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();
window.dataLayer = {
  push: jest.fn()
}

let initState = {
  terms: {
    privacy_notice_agreed: false,
    terms_and_conditions_agreed: false,
  },
  texts: {
    terms: {
      ...termsText
    }
  }
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <TermsBtns onClickTerms={jest.fn()} onClickPrivacy={jest.fn()} />
    </Provider>
  );
};
describe("Test <TermsBtns/> ", () => {
  beforeEach(() => {});

  test("init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  describe("should ", () => {
    test("1", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          privacy_notice_agreed: true,
        },
      };
      const wrapper = handleMount(initState);
      const progressBar = wrapper.find("ProgressBar").props();
      expect(progressBar.data.progress).toBe(50);
    });
    test("2", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          terms_and_conditions_agreed: true,
        },
      };
      const wrapper = handleMount(initState);
      const progressBar = wrapper.find("ProgressBar").props();
      expect(progressBar.data.progress).toBe(100);
    });
  });

  describe("should do next terms or privacy", () => {
    test("should do next privacy", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
        },
      };
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Button).first().props().onClick();
      });
    });

    test("should do next Terms", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
        },
      };
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Button).at(1).props().onClick();
      });
    });
  });

  test("should toggle button", () => {
    initState = {
      ...initState,
      terms: {
        ...initState.terms,
      },
    };
    let e = {
      detail: false,
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Toggle).first().props().onSwitch(e.detail);
    });
  });

  test("should send terms and privacy ", () => {
    initState = {
      ...initState,
      terms: {
        ...initState.terms,
      },
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).at(2).props().onClick();
    });
  });
});
