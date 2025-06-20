import { PopupSize } from "./ui";

export type TOption = {
  value: string;
  label: string;
};

export type SelectOption = {
  readonly value: string;
  readonly label: JSX.Element | string;
  action?: () => any;
};

export type ActionOption = {
  label: React.JSX.Element;
  open?: {elm: React.ReactNode, size: PopupSize};
  onClick?: () => void;
};
