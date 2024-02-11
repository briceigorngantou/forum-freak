import { SetStateAction } from "react";

export default interface dialogInterface {
  show?: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  action?: (
    e?: any
  ) =>
    | React.MouseEventHandler<HTMLAnchorElement>
    | undefined
    | void
    | Promise<void>;
  title?: string;
  message?: string;
}
