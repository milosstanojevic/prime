import React from "react";
import { shallow, mount } from "enzyme";
import { Menu } from "./Menu";
import { Button } from "../buttons";

describe("<Menu/>", () => {

  it(`should render with props`, () => {
    const handleShow = jest.fn();
    const hideMenu = jest.fn();
    const wrapper = shallow(
      <Menu
        target={
          <Button>Test</Button>
        }
        onOpen={handleShow}
        onClose={hideMenu}
        handleScroll={false}
        disableFocusLock={true}
        open
      >
        Text
      </Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it(`should call function to show menu`, () => {
    const handleShow = jest.fn();
    const hideMenu = jest.fn();
    const wrapper = mount(
      <Menu
        target={
          <Button>Test</Button>
        }
        onOpen={handleShow}
        onClose={hideMenu}
      >
        Text
      </Menu>
    );
    wrapper.find(Button).first().simulate("click", { preventDefault: jest.fn() });
    expect(handleShow).toBeCalled();
    wrapper.unmount();
  });
});
