export type DefaultStylesElementType = {
  default: any;
  hover: any;
  focused: any;
  active: any;
  disabled: any;
};

export type StyleForSizeAndType = {
  withIconLeft: DefaultStylesElementType;
  withIconRight: DefaultStylesElementType;
  withoutIcons: DefaultStylesElementType;
  withTwoIcons: DefaultStylesElementType;
};
