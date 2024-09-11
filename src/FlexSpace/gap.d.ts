export type GapValue = number | string;
export type MultiGapObject<T extends GapValue = GapValue> = {
  horizontal: T;
  vertical: T;
};
export type MultiGapArray<T extends GapValue = GapValue> = [T, T];
export type Gap<T extends GapValue = GapValue> =
  | T
  | MultiGapObject<T>
  | MultiGapArray<T>;
