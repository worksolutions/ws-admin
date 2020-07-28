import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";

import { color } from "libs/styles";

import Typography, { TypographyInterface } from "./index";

type TypographyLinkInterface = TypographyInterface & Omit<LinkProps, "to" | "as"> & { to: string; native?: boolean };

const defaultLinkStyles = [color("blue/06")];

function makeTypographyLink(
  link: string,
  native: boolean | undefined,
  nativeParams: { download: boolean; target?: string },
) {
  return React.forwardRef((data: TypographyLinkInterface, ref: Ref<HTMLAnchorElement>) => {
    if (native) {
      return (
        <Typography
          {...data}
          styles={[defaultLinkStyles, data.styles]}
          {...nativeParams}
          // @ts-ignore
          href={link}
          as="a"
          ref={ref}
        />
      );
    }
    // @ts-ignore
    return <Typography as={Link} {...data} styles={[defaultLinkStyles, data.styles]} to={link} ref={ref} />;
  });
}

export const TypographyLink = React.memo(function (props: TypographyLinkInterface) {
  const Component = makeTypographyLink(props.to, props.native, {
    download: props.download,
    target: props.target,
  });
  return <Component {...props} />;
});
