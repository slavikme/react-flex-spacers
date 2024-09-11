/* eslint-disable react/prop-types */
import React from "react";
import Spacer, { SpacerProps } from "./Spacer";

export interface SpacerColumnProps
  extends Partial<
      Pick<
        SpacerProps,
        | "gap"
        | "fillSpace"
        | "middle"
        | "maxHeight"
        | "align"
        | "grow"
        | "shrink"
        | "wrap"
      >
    >,
    React.PropsWithChildren {
  /**
   * Whether to prevent stretching the children to maximum on the X axis.
   */
  noStretch?: boolean;
}

/**
 * Provides vertical spacing between elements.
 */
const SpacerColumn = React.forwardRef<HTMLDivElement, SpacerColumnProps>(
  ({ children, noStretch, ...restProps }, ref) => (
    <Spacer direction="column" stretch={!noStretch} {...restProps} ref={ref} />
  ),
);

export default SpacerColumn;
