import React, {ReactElement} from "react";
import { mount, shallow } from "enzyme";
import { Popper } from "./Popper";
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();

jest.mock("@popperjs/core", () => ({
  createPopper: jest.fn().mockImplementation(() => ({
    update: mockUpdate,
    destroy: mockDestroy,
  })),
}));

describe("<Popper/>", () => {

  afterEach(() => {
    mockUpdate.mockReset();
    mockDestroy.mockReset();
  })

  it("should render", () => {
    const wrapper = shallow(
      <Popper open transition>
        <div id="div-element">Div</div>
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render because it's exited", () => {
    const wrapper = shallow(
      <Popper open>
        <div id="div-element">Div</div>
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render", () => {
    const wrapper = shallow(
      <Popper open={false}>
        <div id="div-element">Div</div>
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render with transition on", () => {
    const wrapper = shallow(
      <Popper open={false} transition>
        <div id="div-element">Div</div>
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render without transition", () => {
    const wrapper = shallow(
      <Popper open>
        <div id="div-element">Div</div>
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with props", () => {
    const wrapper = shallow(
      <Popper
        open
        style={{ color: 'red', }}
        placement="right"
      >
        {(): ReactElement => (
          <div id="div-element">Div</div>
        )}
      </Popper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should mount", () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <Popper
        open
        transition
        ref={ref}
      >
        {(props: { transitionProps: { onEnter: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined; onExited: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined; }; }): ReactElement => {
          return (
            <>
              <div id="div-element-enter" onClick={props.transitionProps.onEnter}>OnEnter</div>
              <div id="div-element-exit" onClick={props.transitionProps.onExited}>OnExited</div>
            </>
          )
        }}
      </Popper>
    );
    wrapper.find('#div-element-enter').simulate('click');
    expect(wrapper.find('#div-element-enter').text()).toBe('OnEnter');
    wrapper.find('#div-element-exit').simulate('click');
    expect(wrapper.find('#div-element-exit').text()).toBe('OnExited');
    wrapper.unmount();
  });

  it("should create popper instance", () => {
    const node = document.getElementsByTagName('body')[0];
    const wrapper = mount(
      <Popper
        open
        transition
        anchorEl={node}
      >
        <span>Test</span>
      </Popper>
    );
    expect(mockDestroy).not.toHaveBeenCalled();
    wrapper.unmount();
    expect(mockDestroy).toHaveBeenCalled();
  });

  it("should handle close when props has been changed", () => {
    const node = document.getElementsByTagName('body')[0];
    const wrapper = mount(
      <Popper open anchorEl={node}>
        <span>Test</span>
      </Popper>
    );
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockDestroy).not.toHaveBeenCalled();
    wrapper.setProps({ open: false });
    expect(mockUpdate).toHaveBeenCalledTimes(2);
    expect(mockDestroy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
