import React from "react";

import Wrapper from "primitives/Wrapper";

import { Aligns, flex, jc, padding, paddingTop, zIndex } from "libs/styles";

interface DefaultContainerWrapperInterface {
  headerStyles?: any;
  header?: JSX.Element | null;
  headerAction?: JSX.Element | null;
  main: JSX.Element;
}

function DefaultContainerWrapper({ header, headerAction, main, headerStyles }: DefaultContainerWrapperInterface) {
  return (
    <>
      {header ? (
        <Wrapper styles={[zIndex(1), padding(16), flex, jc(Aligns.SPACE_BETWEEN), headerStyles]}>
          <Wrapper>{header}</Wrapper>
          {headerAction && <Wrapper>{headerAction}</Wrapper>}
        </Wrapper>
      ) : (
        <Wrapper className="plug-header" styles={paddingTop(16)} />
      )}
      {main}
    </>
  );
}

export default DefaultContainerWrapper;
