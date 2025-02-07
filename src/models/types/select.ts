import { Popups } from "../enum";

export type TOption = {
  value: number;
  label: string;
};

export type SelectOption = {
  readonly value: number;
  readonly label: JSX.Element | string;
  action?: () => any;
};

export type ActionOption = {
  label: React.JSX.Element;
  open?: Popups;
  onClick?: () => void;
};
