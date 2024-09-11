import React from "react";
import Link from "antd/lib/typography/Link";
import { Popover } from "antd";
import { SpacerRow } from "../Spacer";
import { Gap } from "../FlexSpace";

export const PopoverContent: React.FC<
  React.PropsWithChildren<{ itemsCount: number }>
> = ({ itemsCount, children }) => (
  <Popover style={{ maxWidth: 800 }} content={children} placement="topRight">
    <Link style={{ whiteSpace: "nowrap" }}>+{itemsCount}</Link>
  </Popover>
);

export interface EllipsisRowProps {
  /**
   * Gap between items
   */
  gap?: Gap;
  /**
   * Maximum visible items to show before passing the rest to the tooltip. This value can range between 0 and 50. Any number above 50 will be considered as 50.
   */
  maxItems?: number;
}

const BETWEEN_ITEMS_GAP = 8;
/**
 * This number is the highest amount of set states inside a React effect (before it crashes),
 * in order to prevent an infinite loop - React's NESTED_UPDATE_LIMIT = 50
 * @link https://github.com/facebook/react/issues/15093
 */
const MAX_RENDER_DEPTH = 50;

const EllipsisRow: React.FC<React.PropsWithChildren<EllipsisRowProps>> = ({
  children,
  gap = BETWEEN_ITEMS_GAP,
  maxItems = MAX_RENDER_DEPTH,
}) => {
  const items = React.useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const [cutIndex, setCutIndex] = React.useState<number>(
    Math.min(MAX_RENDER_DEPTH, maxItems, items.length),
  );
  const visibleNodes = React.useMemo<React.ReactNode[]>(
    () => items.slice(0, cutIndex),
    [cutIndex, items],
  );
  const extraNodes = React.useMemo<React.ReactNode[]>(
    () => items.slice(cutIndex),
    [cutIndex, items],
  );

  const outerRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const extraRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    let extraWidth = extraRef?.current?.offsetWidth || 0;
    if (extraWidth) {
      extraWidth += BETWEEN_ITEMS_GAP;
    }

    if (innerRef?.current === null || outerRef?.current === null) {
      return;
    }

    if (
      cutIndex > 0 &&
      Number(innerRef?.current?.scrollWidth) + extraWidth >
        Number(outerRef?.current?.offsetWidth)
    ) {
      setCutIndex(cutIndex - 1);
    }
  }, [cutIndex, gap, extraNodes, visibleNodes]);

  React.useEffect(() => {
    // If maxItems is set, the number of items to show shouldn't be more than maxItems
    setCutIndex(maxItems ? Math.min(maxItems, items.length) : items.length);
  }, [maxItems, items]);

  return (
    <SpacerRow gap={gap} nowrap maxHeight ref={outerRef}>
      <SpacerRow gap={gap} nowrap maxHeight ref={innerRef}>
        {visibleNodes}
      </SpacerRow>
      <div ref={extraRef}>
        {extraNodes.length > 0 && (
          <PopoverContent itemsCount={extraNodes.length}>
            <SpacerRow gap={gap}>{extraNodes}</SpacerRow>
          </PopoverContent>
        )}
      </div>
    </SpacerRow>
  );
};

export default EllipsisRow;
