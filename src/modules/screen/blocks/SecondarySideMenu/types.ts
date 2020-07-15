import { Icons } from "primitives/Icon";

export interface SidebarItemInterface {
  name: string;
  reference: string;
  icon?: Icons;
  subElements?: SidebarItemInterface[];
}

export interface SecondaryMenuDataSourceInterface {
  title: string;
  reference: string;
  id?: string;
  items: SidebarItemInterface[];
}
