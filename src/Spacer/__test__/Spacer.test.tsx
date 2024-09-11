//Spacer/__test__/Spacer.test.tsx
import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Spacer from "../Spacer";

describe("Spacer component", () => {
  it("Spacer should render correctly", () => {
    render(<Spacer>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toBeInTheDocument();
  });

  it("Spacer should have default values", () => {
    render(<Spacer>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle("flex-direction: row");
    expect(el).toHaveStyle("align-items: safe center");
    expect(el).toHaveStyle("justify-content: flex-start");
    expect(el).toHaveStyle("gap: 0px");
  });

  it("Spacer should handle gap", () => {
    render(<Spacer gap={10}>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("gap: 10px");
  });

  it("Spacer should handle complex gap", () => {
    render(<Spacer gap={{ horizontal: 10, vertical: "3em" }}>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("gap: 3em 10px");
  });

  it("Spacer should handle maxHeight", () => {
    render(<Spacer maxHeight>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("height: 100%");
  });

  it("Spacer should handle middle", () => {
    render(<Spacer middle>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("align-items: safe center");
    expect(el).toHaveStyle("justify-content: safe center");
  });

  it("Spacer should handle fillSpace", () => {
    render(<Spacer fillSpace>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("justify-content: space-between");
  });

  it("Spacer should handle middle with fillSpace", () => {
    render(
      <Spacer middle fillSpace>
        Hello
      </Spacer>,
    );
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("align-items: safe center");
  });

  it("Spacer should handle align", () => {
    render(<Spacer align="start">Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("align-items: flex-start");
  });

  it("Spacer should handle grow", () => {
    render(<Spacer grow>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("flex-grow: 1");
  });

  it("Spacer should handle shrink", () => {
    render(<Spacer shrink={false}>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("flex-shrink: 0");
  });

  it("Spacer should handle direction", () => {
    render(<Spacer direction="row">Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("flex-direction: row");
    expect(el).toHaveStyle("align-items: safe center");
  });

  it("Spacer should handle wrap", () => {
    render(<Spacer wrap>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("flex-wrap: wrap");
  });

  it("Spacer should handle stretch", () => {
    render(<Spacer stretch>Hello</Spacer>);
    const el = screen.getByText("Hello");
    expect(el).toHaveStyle("align-items: stretch");
  });
});
