import React from "react";
import { mount } from "enzyme";
import Calendar from "../../../components/Calendar/Calendar";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { proceduresText } from "../../../texts/proceduresText";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

let initState = {
  texts: {
    texts: {
      procedures: {
        ...proceduresText,
      },
      dashboard: {
        footerText: {
          text: "hola",
        },
      },
    },
  },
};
let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Calendar history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <Calendar />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
