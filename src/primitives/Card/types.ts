export interface CardStatusInterface {
  iconName: string;
  color: string;
}

export type CardActionInterface = {
  name: string;
} & (
  | {}
  | {
      iconName: string;
      iconColor: string;
    }
);

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
