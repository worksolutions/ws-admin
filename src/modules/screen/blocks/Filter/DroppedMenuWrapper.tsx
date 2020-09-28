import React from "react";
import { duration160 } from "layout/durations";
import { elevation32 } from "style/shadows";

import Wrapper from "primitives/Wrapper";

import LoadingProvider from "components/LoadingContainer/LoadingProvider";

import {
  backgroundColor,
  border,
  borderRadius,
  height,
  left,
  opacity,
  overflow,
  padding,
  position,
  right,
  top,
  transition,
} from "libs/styles";
import { useMeasure } from "libs/hooks/useMeasure";
import { provideRef } from "libs/provideRef";

const paddingTopValue = 8;
const paddingBottomValue = 24;
const childContainerBorder = 1;

function getOpenedBoxHeight(childHeight: number) {
  return childHeight + paddingTopValue + paddingBottomValue + childContainerBorder * 2;
}

function DroppedMenuWrapper({ children, opened }: { children: React.ReactNode; opened: boolean }) {
  const [ref, bounds] = useMeasure();
  return (
    <LoadingProvider>
      {(loadingProviderRef) => (
        <Wrapper
          styles={[
            transition(`opacity ${duration160}, height ${duration160}, box-shadow ${duration160}`),
            position("absolute"),
            left(-1),
            right(-1),
            top("calc(100% + 4px)"),
            borderRadius(8),
            backgroundColor("white"),
            opened
              ? [elevation32, opacity(1), height(getOpenedBoxHeight(bounds.height))]
              : [overflow("hidden"), opacity(0), height(0)],
          ]}
        >
          <Wrapper
            ref={provideRef(ref, loadingProviderRef)}
            styles={[
              borderRadius(8),
              border(childContainerBorder, "gray-blue/02"),
              padding(`${paddingTopValue}px 16px ${paddingBottomValue}px 16px`),
            ]}
          >
            {children}
          </Wrapper>
        </Wrapper>
      )}
    </LoadingProvider>
  );
}

export default React.memo(DroppedMenuWrapper);
