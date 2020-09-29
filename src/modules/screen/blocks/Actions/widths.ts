export enum DefaultWidths {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  FULL_WIDTH = "full-width",
}

export const defaultWidths: Record<DefaultWidths, string | number> = {
  [DefaultWidths.SMALL]: 192,
  [DefaultWidths.MEDIUM]: 288,
  [DefaultWidths.LARGE]: 448,
  [DefaultWidths.FULL_WIDTH]: "100%",
};
