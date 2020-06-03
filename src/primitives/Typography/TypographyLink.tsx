import React, { Ref } from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

import Typography, { TypographyInterface } from "./index";

type TypographyLinkInterface = TypographyInterface & Omit<LinkProps, "to"> & { to: string; native?: boolean };

const StyledLink = styled(
  React.forwardRef((props: TypographyLinkInterface, ref: Ref<HTMLAnchorElement>) => <Link {...props} ref={ref} />),
)``;

function makeTypographyLinkAsProp(
  link: string,
  native: boolean | undefined,
  nativeParams: { download: boolean; target?: string },
) {
  return React.forwardRef((data: TypographyLinkInterface, ref: Ref<HTMLAnchorElement>) => {
    if (native) {
      return <StyledLink {...data} {...nativeParams} href={link} as="a" ref={ref} />;
    }
    return <StyledLink {...data} to={link} innerRef={ref} />;
  });
}

export const TypographyLink = React.memo(function (props: TypographyLinkInterface) {
  return (
    <Typography
      {...props}
      as={makeTypographyLinkAsProp(props.to, props.native, {
        download: props.download,
        target: props.target,
      })}
    />
  );
});
