import { Icons } from "../Icon";
import { ListItemInterface } from "../List/ListItem";
import { BaseInputWrapperInterface, InputSize } from "../Input/InputWrapper";

export type DropdownItem<CODE extends string | number> = ListItemInterface<CODE>;
export type DropdownOptionalAction = { title: string; icon?: Icons; onClick: () => void };

export interface DropdownContainerInterface<CODE extends string | number> {
  excludeSelected?: boolean;
  searchable?: boolean;
  searchableEmptyListText?: string;
  searchableNotFoundText?: string;
  optionalAction?: DropdownOptionalAction;
  size?: InputSize;
  items?: DropdownItem<CODE>[];
  selectedItemCodes?: CODE[];
  onChange: (code: CODE) => void;
}

export interface DropdownInterface<CODE extends string | number>
  extends Omit<DropdownContainerInterface<CODE>, "selectedItemCodes">,
    Pick<
      BaseInputWrapperInterface,
      "outerStyles" | "disabled" | "title" | "titlePosition" | "tip" | "error" | "success" | "children" | "size"
    > {
  styles?: any;
  placeholder?: string;
  selectedItemCode?: CODE;
}
