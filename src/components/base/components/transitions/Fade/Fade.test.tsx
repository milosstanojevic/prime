import React from "react"
import { render } from "enzyme"
import { Fade } from "./Fade"

describe("<Fade />", () => {
  it("should render", () => {
    expect(render(
      <Fade>
        <span>Test</span>
      </Fade>
    )).toMatchSnapshot();
  });

  it("should render as entered", () => {
    expect(render(
      <Fade in timeout={300}>
        <span>Test</span>
      </Fade>
    )).toMatchSnapshot();
  });
});
