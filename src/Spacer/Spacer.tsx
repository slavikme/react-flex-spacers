/* eslint-disable react/prop-types */
import React from "react";
import FlexSpace, { Gap } from "../FlexSpace";
import { FlexSpaceProps } from "../FlexSpace/FlexSpace";

export interface SpacerProps extends React.PropsWithChildren {
  /**
   * Direction of the spacer.
   * Values are `row` and `column`.
   */
  direction?: "row" | "column";

  /**
   * The gap of the spacer.
   *
   * ### Possible Values
   * `Size.Small`, `Size.Medium`, `Size.Large`, an object with `horizontal` and
   * `vertical` values and an array with two values (first for `vertical` and second
   * for `horizontal`).
   *
   * ### Example:
   * ```
   * <Spacer gap={{ vertical: 8, horizontal: 12 }}>
   * ```
   * or
   * ```
   * <Spacer gap={[8, 12]}>
   * ```
   * will create a spacer with a vertical gap of 8px and a horizontal gap of 12px.
   * If only single value is provided, it will be used for both horizontal and vertical gaps.
   */
  gap?: Gap;

  /**
   * Whether the spacer should wrap its children.
   */
  wrap?: boolean;

  /**
   * Whether the spacer should stretch the children to maximum on the cross axis.
   * Basically, it adds `align-items: stretch` to the flex container.
   */
  stretch?: boolean;

  /**
   * Whether the spacer should fill the available space, with empty space on the
   * main axis, while keeping the children at their natural size. Basically, it
   * will add `justify-content: space-between` to the flex container. Otherwise,
   * the justify-content stays at its default, `flex-start`.
   * If `middle` is true, this will be ignored.
   */
  fillSpace?: boolean;

  /**
   * Whether the container should have a height of 100%.
   * This is useful for cases where we want the container to fill the available
   * height.
   */
  maxHeight?: boolean;

  /**
   * Whether the content should be in the middle.
   * Basically, it adds `justify-content: center` to the flex container.
   * If `fillSpace` is true, `fillSpace` will be ignored.
   */
  middle?: boolean;

  /**
   * Alignment of the children on the cross axis.
   */
  align?: "start" | "center" | "safe center" | "end" | "stretch" | "baseline";

  /**
   * Whether the spacer should grow together with its parent.
   */
  grow?: boolean;

  /**
   * Whether the spacer should shrink together with its parent.
   */
  shrink?: boolean;
}

/**
 * Provides spacing between elements.
 */
const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      children,
      direction = "row",
      gap = 0,
      wrap = true,
      stretch = false,
      fillSpace = false,
      maxHeight = false,
      middle = false,
      align = "safe center",
      grow = false,
      shrink = true,
    },
    ref,
  ) => {
    let alignItems: FlexSpaceProps["alignItems"] = "flex-start";

    if (align === "start") {
      alignItems = "flex-start";
    } else if (align === "end") {
      alignItems = "flex-end";
    } else {
      alignItems = align;
    }

    if (stretch) {
      alignItems = "stretch";
    }
    return (
      <FlexSpace
        direction={direction}
        alignItems={alignItems}
        justifyContent={
          middle ? "safe center" : fillSpace ? "space-between" : "flex-start"
        }
        gap={gap}
        wrap={wrap ? "wrap" : "nowrap"}
        style={{
          height: maxHeight ? "100%" : undefined,
          maxHeight: maxHeight ? "100%" : undefined,
          minHeight: maxHeight ? "100%" : undefined,
        }}
        grow={grow ? 1 : 0}
        shrink={shrink ? 1 : 0}
        ref={ref}
      >
        {children}
      </FlexSpace>
    );
  },
);

export default Spacer;
