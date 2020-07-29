import { Colors } from "libs/styles";

import { Icons } from "../Icon";

export enum CardStatusIconSize {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export interface CardStatusInterface {
  icon: Icons;
  color: Colors;
  size?: CardStatusIconSize;
}

export type CardActionInterface = {
  name: string;
  icon?: Icons;
  iconColor?: Colors;
  loading?: boolean;
  handler: () => Promise<void>;
};

export interface CardInterface {
  id: string | number;
  heading?: string;
  statuses?: CardStatusInterface[];
  actions?: CardActionInterface[];
  title?: string;
  image?: string;
  redirectReference?: string;
}

export interface CardImageConfig {
  aspectRatio: number;
}
