export type Args = string[];

export type RawOptions = {
  project: string | null;
  install: boolean | null;
  dev: boolean;
};

type NonNullableRawOptions = {
  [Prop in keyof RawOptions]: NonNullable<RawOptions[Prop]>;
};

export type Options = NonNullableRawOptions;
