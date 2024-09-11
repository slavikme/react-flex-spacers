/* eslint-disable react/prop-types */
import React from "react";
import Spacer, { SpacerProps } from "./Spacer";

export interface SpacerRowProps
  extends Pick<
      SpacerProps,
      "gap" | "fillSpace" | "maxHeight" | "align" | "grow" | "shrink"
    >,
    React.PropsWithChildren {
  /**
   * If true, the children will not wrap.
   * If any `wrap` value and `nowrap = true` are provided, `nowrap` will take precedence.
   * This was added for convenience and code readability.
   */
  nowrap?: boolean;
}

/**
 * Provides horizontal spacing between elements.
 */
const SpacerRow = React.forwardRef<HTMLDivElement, SpacerRowProps>(
  ({ nowrap, ...restProps }, ref) => (
    <Spacer
      direction="row"
      wrap={!nowrap}
      stretch={false}
      {...restProps}
      ref={ref}
    />
  ),
);

export default SpacerRow;
