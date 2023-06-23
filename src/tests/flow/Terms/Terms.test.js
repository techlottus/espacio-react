import React from "react";
import { mount } from "enzyme";
import Terms from "../../../layout/Terms/Terms";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { typesRequestErrors } from "../../../constants/error.constant";
import { texts } from "../../../texts/indexText";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { act } from "@testing-library/react";
import TermsBtns from "../../../layout/Terms/views/TermsBtns";
import { termsText } from "../../../texts/termsText";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Menu } from "../../../components/Menu/Menu";
import TermsShow from "../../../layout/Terms/views/TermsShow";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();
window.dataLayer = {
  push: jest.fn(),
};
window.innerWidth = 1200;

let initState = {
  terms: {
    privacy_notice_agreed: false,
    terms_and_conditions_agreed: false,
    errors: {
      [typesRequestErrors.getPrivacyNotice]: {
        isError: false,
        msg: null,
      },
      [typesRequestErrors.patchPrivacyNotice]: {
        isError: false,
        msg: null,
      },
    },
  },
  texts: {
    terms: {
      ...termsText,
    },
  },
};

let store = mockStore(initState);
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Terms history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <Terms/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  describe("should show errors", () => {
    test("path privacy notcie", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          errors: {
            ...initState.terms.errors,
            [typesRequestErrors.patchPrivacyNotice]: {
              isError: true,
              msg: "Error",
            },
          },
        },
      };
      const wrapper = handleMount(initState);
    });
    test("get privacy notice", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          errors: {
            ...initState.terms.errors,
            [typesRequestErrors.getPrivacyNotice]: {
              isError: true,
              msg: "Error",
            },
          },
        },
      };
      const wrapper = handleMount(initState);
    });
  });

  describe("should ", () => {
    test("1", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          privacy_notice_agreed: false,
        },
      };
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(TermsBtns).props().onClickPrivacy();
      });
      wrapper.update();
      act(() => {
        wrapper.find(TermsShow).first().props().clickShow("accept");
      });
      act(() => {
        wrapper.find(TermsShow).first().props().clickShow("decline");
      });
      act(() => {
        wrapper.find(TermsShow).first().props().clickShow("other");
      });
      wrapper.update();
    });
    test("2", () => {
      initState = {
        ...initState,
        terms: {
          ...initState.terms,
          terms_and_conditions_agreed: false,
        },
      };
      const wrapper = handleMount(initState);

      act(() => {
        wrapper.find(TermsBtns).props().onClickTerms();
      });
    });
  });

  describe("should click on navbar", () => {
    test("should show menu", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Navbar).props().onRight({
          detail: "apps",
        });
      });
      wrapper.update();
      act(() => {
        wrapper.find(".menu").find(Menu).props().onCard({
          detail: "back",
        });
      });
      wrapper.update();
      act(() => {
        wrapper.find(".menu").find(Menu).props().onCard({
          detail: "other",
        });
      });
      wrapper.update();
      act(() => {
        wrapper.find(".menu").find(Menu).props().outside();
      });
      act(() => {
        wrapper.find(".menu").find(Menu).props().onClose();
      });
      wrapper.update();
      act(() => {
        wrapper.find(Navbar).props().onRight({
          detail: "notifications",
        });
      });
      wrapper.update();
      act(() => {
        wrapper.find(Navbar).props().onRight({
          detail: "other",
        });
      });
      wrapper.update();
    });
    test("should click on logo", () => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Navbar).props().onLogo();
      });
      wrapper.update();
    });
  });

  test("Should redirect to terms", () => {
    window.innerWidth = 990;

    const wrapper = handleMount(initState);

    act(() => {
      wrapper.find(TermsBtns).props().onClickTerms();
    });

    act(() => {
      wrapper.find(TermsBtns).props().onClickPrivacy();
    })

  });

});
