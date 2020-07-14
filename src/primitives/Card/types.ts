import { Colors } from "libs/styles";

import { Icons } from "../Icon";

export interface CardStatusInterface {
  iconName: string;
  color: string;
}

export type CardActionInterface = {
  name: string;
  iconName?: Icons;
  iconColor?: Colors;
};

export interface CardInterface {
  id: string | number;
  heading?: string;
  statuses?: CardStatusInterface[];
  actions?: CardActionInterface[];
  title?: string;
  image?: string;
}

export interface CardImageConfig {
  aspectRatio: number;
}
