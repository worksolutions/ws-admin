import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

import { color } from "libs/styles";

import Typography, { TypographyInterface } from "./index";

type TypographyLinkInterface = TypographyInterface & Omit<LinkProps, "to" | "as">;

const defaultLinkStyles = [color("blue/06")];

function makeTypographyLink(
  link: string,
  native: boolean | undefined,
  nativeParams: { download: boolean; target?: string },
) {
  return React.forwardRef(({ styles, ...data }: TypographyLinkInterface, ref: Ref<HTMLAnchorElement>) => {
    if (native) {
      return (
        <Typography
          {...data}
          styles={[defaultLinkStyles, styles]}
          {...nativeParams}
          // @ts-ignore
          href={link}
          as="a"
          ref={ref}
        />
      );
    }
    // @ts-ignore
    return <Typography as={Link} {...data} styles={[defaultLinkStyles, styles]} to={link} ref={ref} />;
  });
}

export const TypographyLink = React.memo(function ({
  to,
  target,
  download,
  native,
  ...props
}: TypographyLinkInterface & { to: string; native?: boolean }) {
  const Component = makeTypographyLink(to, native, { download, target });
  return <Component {...props} />;
});
