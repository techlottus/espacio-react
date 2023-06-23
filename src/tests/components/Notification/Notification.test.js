import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Notification from "../../../components/Notification/Notification";
import { notiObs } from "../../../observables/notificationObs";
import { Subject } from "rxjs";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;

jest.doMock('../../../observables/notificationObs',() => {
  return {
    notiObs: new Subject(
      {
        type: {
          icon: 'person',
          type: 'success'
        },
        text: 'Hola Mundo'
      }
  )
  }
})


let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Notification  />
    </Provider>
  );
};

describe("Test <Notification/>", () => {

  beforeEach(() => {
    // notiObs.next({
    //   type: {
    //     icon: 'person',
    //     type: 'success'
    //   },
    //   text: 'Hola Mundo'
    // })
  })

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
