import { Icons } from "../Icon";
import { ListItemInterface } from "../List/ListItem";
import { BaseInputWrapperInterface } from "../Input/InputWrapper";

export type DropdownItem<CODE extends string | number> = ListItemInterface<CODE>;
export type DropdownOptionalAction = { title: string; icon?: Icons; onClick: () => void };

export interface DropdownInterface<CODE extends string | number>
  extends Pick<
    BaseInputWrapperInterface,
    | "outerStyles"
    | "fullWidth"
    | "disabled"
    | "title"
    | "titlePosition"
    | "tip"
    | "error"
    | "success"
    | "children"
    | "size"
  > {
  styles?: any;
  placeholder?: string;
  optionalAction?: DropdownOptionalAction;
  selectedItemCode?: CODE;
  items?: DropdownItem<CODE>[];
  onChange: (code: CODE) => void;
}
