import { Icons } from "primitives/Icon";

export interface SidebarItemInterface {
  name: string;
  to: string;
  icon?: Icons;
  subElements?: SidebarItemInterface[];
}

export interface SecondaryMenuDataSourceInterface {
  title: string;
  to: string;
  items: SidebarItemInterface[];
}
