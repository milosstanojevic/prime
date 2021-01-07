import React from "react"
import { render } from "enzyme"
import { SlideFromTop } from "./SlideFromTop"

describe("<SlideFromTop />", () => {
  it("should render", () => {
    expect(render(
      <SlideFromTop>
        <span>Test</span>
      </SlideFromTop>
    )).toMatchSnapshot();
  });

  it("should render as entered", () => {
    expect(render(
      <SlideFromTop in>
        <span>Test</span>
      </SlideFromTop>
    )).toMatchSnapshot();
  });
});
