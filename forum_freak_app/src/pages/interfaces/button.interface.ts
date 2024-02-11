export interface ButtonInterface {
  name: string;
  style?: string;
  othersProps?: React.ReactNode;
  onPress?: (
    // eslint-disable-next-line no-unused-vars
    e?: any
  ) =>
    | React.MouseEventHandler<HTMLAnchorElement>
    | undefined
    | void
    | Promise<void>;
}
