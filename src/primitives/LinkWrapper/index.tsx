import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";
import { Link, LinkProps } from "react-router-dom";

import { StyledComponentsAS } from "types/StyledComponentsAS";

const LinkWrapper = styled(Link)``;

interface WrapperInterface extends LinkProps {
  styles?: any;
  as?: StyledComponentsAS;
  children?: ReactNode;
}

export default React.memo(
  forwardRef(function (props: WrapperInterface, ref) {
    const { styles, as, ...otherProps } = props;
    return <LinkWrapper ref={ref} css={styles} as={as} {...otherProps} />;
  }),
);
