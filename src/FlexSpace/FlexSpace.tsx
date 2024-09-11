import React from "react";
import isNumber from "lodash/isNumber";
import { Gap, GapValue, MultiGapArray, MultiGapObject } from "./gap";

export interface FlexSpaceProps extends React.PropsWithChildren {
  /**
   * The space between elements.
   * @default 0
   */
  gap?: Gap;

  /**
   * The grow factor of the element.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
   * @default 0
   */
  grow?: number;

  /**
   * The shrink factor of the element.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
   * @default 1
   */
  shrink?: number;

  /**
   * The direction of the flex container.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   * @default "row"
   */
  direction?: "column" | "column-reverse" | "row" | "row-reverse";

  /**
   * The alignment of the flex container.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   * @default "flex-start"
   */
  justifyContent?:
    | "center"
    | "safe center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "baseline";

  /**
   * The alignment of the flex container.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   * @default "stretch"
   */
  alignItems?:
    | "center"
    | "safe center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";

  /**
   * The wrapping configuration for the children.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
   * @default "wrap"
   */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";

  className?: string;
  style?: React.CSSProperties;
}

export const isMultiGapObject = <T extends GapValue = GapValue>(
  gap: Gap<T>,
): gap is MultiGapObject<T> =>
  typeof gap === "object" && "horizontal" in gap && "vertical" in gap;
export const isMultiGapArray = <T extends GapValue = GapValue>(
  gap: Gap<T>,
): gap is MultiGapArray<T> => Array.isArray(gap) && gap.length === 2;

export const getGapForStyle = <T extends GapValue = GapValue>(
  gap: Gap<T>,
): string => {
  if (typeof gap === "string") {
    return gap;
  }
  if (typeof gap === "number") {
    return `${gap}px`;
  }
  if (isMultiGapObject(gap)) {
    return `${getGapForStyle(gap.vertical)} ${getGapForStyle(gap.horizontal)}`;
  }
  if (isMultiGapArray(gap)) {
    return `${getGapForStyle(gap[0])} ${getGapForStyle(gap[1])}`;
  }
  return "";
};

/**
 * Provides flexible between elements and more control over the layout.
 */
export const FlexSpace = React.forwardRef<HTMLDivElement, FlexSpaceProps>(
  (
    {
      gap = 0,
      direction = "row",
      justifyContent = "flex-start",
      alignItems = "stretch",
      wrap = "wrap",
      grow,
      shrink,
      style: styleProp,
      ...otherProps
    },
    ref,
  ) => {
    const style = React.useMemo<React.CSSProperties>(
      () => ({
        ...styleProp,
        display: "flex",
        // minWidth: 0, // fixes the ellipsis issue for nested flex items
        gap: getGapForStyle(gap),
        flexDirection: direction ?? "row",
        justifyContent,
        alignItems,
        flexWrap: wrap,
        flexGrow: grow ?? undefined,
        flexShrink: isNumber(shrink) ? shrink : undefined,
      }),
      [
        shrink,
        alignItems,
        direction,
        gap,
        grow,
        justifyContent,
        styleProp,
        wrap,
      ],
    );

    return <div ref={ref} style={style} {...otherProps} />;
  },
);

FlexSpace.displayName = "FlexSpace";

export default FlexSpace;
