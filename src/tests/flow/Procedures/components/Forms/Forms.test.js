import React from "react";
import { mount } from "enzyme";
import Forms from "../../../../../flow/Procedures/components/ProcedureLayout/views/Forms";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ProceduresContext } from "../../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();

let initState = {};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
// const type = jest.fn().mockImplementation({ flow: "current" });
const steps = {
  focus: 0,
  titles: [
    {
      text: "Información",
      disabled: false,
    },
    {
      text: "Documentación",
      disabled: false,
    },
  ],
  off: false,
};
let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{steps}}>
      <Provider store={store}>
        <BrowserRouter>
          <Forms />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <Forms/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
