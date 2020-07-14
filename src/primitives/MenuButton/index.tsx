import React, { ReactNode } from "react";
import { elevation16 } from "style/shadows";
import { useHover } from "react-use";
import { useSpring, animated } from "react-spring";
import { duration200Number } from "layout/durations";

import { Icons } from "primitives/Icon";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import usePopper, { getPopperMarginStyleForPlacement } from "primitives/Popper/usePopper";
import Wrapper from "primitives/Wrapper";

import { backgroundColor, border, borderRadius, position } from "libs/styles";
import { useBoolean } from "libs/hooks";

import HandleClickOutside from "../HandleClickOutside";

export enum MenuButtonOpenMode {
  HOVER,
  CLICK,
}

interface MenuButtonInterface {
  openMode?: MenuButtonOpenMode;
  buttonIcon?: Icons;
  children: (close: () => void) => ReactNode;
}

const ComponentForOpenMode: Record<
  MenuButtonOpenMode,
  (props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    getButton: (props: Record<string, any>) => ReactNode;
    getOpenedContent: () => ReactNode;
  }) => JSX.Element
> = {
  [MenuButtonOpenMode.CLICK]: ({ opened, open, close, getButton, getOpenedContent }) => {
    return (
      <HandleClickOutside enabled={opened} onClickOutside={close}>
        {(ref) => (
          <Wrapper ref={ref} styles={[position("relative")]}>
            {getButton({ onClick: () => (opened ? close() : open()) })}
            {getOpenedContent()}
          </Wrapper>
        )}
      </HandleClickOutside>
    );
  },
  [MenuButtonOpenMode.HOVER]: ({ open, close, getButton, getOpenedContent }) => {
    const [hoverable, hovered] = useHover(() => {
      return <div>{getButton({ children: getOpenedContent() })}</div>;
    });

    React.useEffect(() => {
      if (hovered) {
        open();
        return;
      }
      close();
    }, [hovered]);

    return <Wrapper styles={[position("relative")]}>{hoverable}</Wrapper>;
  },
};

function MenuButton({ buttonIcon, children, openMode }: MenuButtonInterface) {
  const [opened, open, close] = useBoolean(false);

  const spring = useSpring({
    config: { duration: duration200Number },
    opacity: opened ? 1 : 0,
  });

  const { initPopper, placement } = usePopper({ placement: "bottom-start" });
  const Component = ComponentForOpenMode[openMode!];

  return (
    <Component
      opened={opened}
      open={open}
      close={close}
      getButton={(props) => (
        <Button
          type={ButtonType.ICON}
          size={ButtonSize.SMALL}
          iconLeft={buttonIcon}
          ref={initPopper("parent")}
          {...(props as any)}
        />
      )}
      getOpenedContent={() => (
        <Wrapper
          as={animated.div}
          style={{
            opacity: spring.opacity,
            visibility: spring.opacity.to((value) => (value === 0 ? "hidden" : "visible")),
          }}
          ref={initPopper("child")}
        >
          <Wrapper
            styles={[
              getPopperMarginStyleForPlacement(placement, 8),
              backgroundColor("white"),
              border(1, "gray-blue/02"),
              elevation16,
              borderRadius(6),
            ]}
          >
            {children(close)}
          </Wrapper>
        </Wrapper>
      )}
    />
  );
}

MenuButton.defaultProps = {
  buttonIcon: "kebab-horizontal",
  openMode: MenuButtonOpenMode.CLICK,
};

export default React.memo(MenuButton);
