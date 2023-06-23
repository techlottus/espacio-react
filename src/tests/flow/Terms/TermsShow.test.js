import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import TermsShow from "../../../layout/Terms/views/TermsShow";
import { texts } from "../../../texts/indexText";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Button } from "../../../components/Button/Button";
import { termsText } from "../../../texts/termsText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.dataLayer = {
  push: jest.fn()
}

let initState = {
  terms: {},
  texts: {
    terms: {
      ...termsText
    }
  }
};
let store = mockStore(initState);
const privacyContent = texts?.terms.privacyContent;

const handleMount = (initState) =>  {
  store = mockStore(initState)
  return mount(
    <Provider store={store}>
    <BrowserRouter>
      <TermsShow clickShow={jest.fn()} contents={privacyContent.contents} />
    </BrowserRouter>
  </Provider>
  )
}


describe("Test <TermsShow/> ", () => {
  beforeEach(() => {
  });

  test("init component", () => {
    const wrapper = handleMount(initState)
    expect(wrapper).toMatchSnapshot();
  });

  describe('Should accept or decline', () => {
    test ('should decline', () => {
      const wrapper = handleMount(initState);
  
      act(() => {
        wrapper.find(Button).first().props().onClick()
      })
    })

    test ('should accept', () => {
      const wrapper = handleMount(initState);
  
      act(() => {
        wrapper.find(Button).last().props().onClick()
      })
    })
  })


});
