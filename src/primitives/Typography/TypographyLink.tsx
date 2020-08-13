import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";
import { isNil } from "ramda";
import { duration160 } from "layout/durations";

import { color, disableDecoration, hover, transition } from "libs/styles";
import { getLinkIsNative } from "libs/linkIsNative";

import Typography, { TypographyInterface, TypographyTypes } from "./index";

type TypographyLinkInterface = TypographyInterface & Omit<LinkProps, "to" | "as" | "type">;

export const blueTypographyLinkStyles = [color("blue/06")];

export const blackTypographyLinkStyles = [
  TypographyTypes["body-semi-bold"],
  transition(`color ${duration160}`),
  hover(color("gray-blue/07")),
  disableDecoration,
];

type Theme = "black" | "blue";

function makeTypographyLink(
  link: string,
  theme: Theme | undefined,
  nativeParams: { native: boolean | undefined; download: boolean; target?: string },
) {
  const themeStyles = theme
    ? theme === "black"
      ? blackTypographyLinkStyles
      : blueTypographyLinkStyles
    : nativeParams.native
    ? blueTypographyLinkStyles
    : blackTypographyLinkStyles;

  return React.forwardRef(({ styles, ...data }: TypographyLinkInterface, ref: Ref<HTMLAnchorElement>) => {
    if (nativeParams.native) {
      return (
        <Typography
          {...data}
          styles={[themeStyles, styles]}
          {...nativeParams}
          // @ts-ignore
          href={link}
          as="a"
          ref={ref}
        />
      );
    }

    // @ts-ignore
    return <Typography as={Link} {...data} styles={[themeStyles, styles]} to={link} ref={ref} />;
  });
}

export const TypographyLink = React.memo(function ({
  to,
  target,
  download,
  native,
  theme,
  ...props
}: TypographyLinkInterface & { to: string; native?: boolean; theme?: Theme }) {
  const Component = makeTypographyLink(to, theme, {
    native: isNil(native) ? getLinkIsNative(to) : native,
    download,
    target,
  });
  return <Component {...props} />;
});
