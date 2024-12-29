export type TOption = {
  value: string;
  label: string;
};

export type SelectOption = {
  readonly value: string;
  readonly label: JSX.Element | string;
  action?: () => any;
};