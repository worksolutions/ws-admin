import React from "react";
import { zIndex_toast } from "layout/zIndexes";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  ai,
  Aligns,
  animation,
  backgroundColor,
  border,
  borderRadius,
  bottom,
  firstChild,
  flex,
  flexColumn,
  fullWidth,
  height,
  horizontalPadding,
  jc,
  lastChild,
  left,
  marginBottom,
  marginRight,
  marginTop,
  opacity,
  position,
  transform,
  willChange,
} from "libs/styles";
import { useEventEmitter } from "libs/events";
import { cb } from "libs/CB";

import globalEventBus from "modules/globalEventBus";

import toastReceiverData, { hide, show, ToastReceiverData } from "./toastReceiverData";

const hideAnimation = {
  name: hide,
  duration: ".5s",
  timingFunction: "linear",
  delay: `${ToastReceiverData.defaultAutoRemoveTime - 500}ms`,
};

const ToastReceiver = cb(
  {
    observer: true,
    useStateBuilder: () => {
      useEventEmitter(globalEventBus, "ADD_TOAST", (data) => {
        toastReceiverData.addToast(data);
      });
      return {};
    },
  },
  function ToastReceiver() {
    return (
      <Wrapper
        styles={[
          flex,
          flexColumn,
          ai(Aligns.CENTER),
          position("fixed"),
          left("50%"),
          zIndex_toast,
          transform("translateX(-50%)"),
          bottom(0),
          firstChild(marginTop(0)),
          lastChild([
            willChange("margin-bottom, opacity"),
            animation([{ name: show, duration: ".5s", timingFunction: "linear" }, hideAnimation]),
            marginBottom(40),
          ]),
        ]}
      >
        {toastReceiverData.toasts.map(({ id, toast: { text, error, cancelButton } }) => (
          <Wrapper
            key={id}
            styles={[
              willChange("opacity"),
              animation([hideAnimation]),
              fullWidth,
              flex,
              jc(Aligns.CENTER),
              marginTop(24),
              height(48),
            ]}
          >
            <Wrapper
              styles={[
                backgroundColor("white"),
                borderRadius(6),
                border(1, error ? "red/05" : "gray-blue/02"),
                flex,
                ai(Aligns.CENTER),
                horizontalPadding(16),
              ]}
            >
              <Typography styles={marginRight(12)}>{text}</Typography>
              {cancelButton && (
                <Button
                  styles={marginRight(8)}
                  type={ButtonType.GHOST}
                  size={ButtonSize.MEDIUM}
                  onClick={() => cancelButton!.onClick}
                >
                  {cancelButton.text}
                </Button>
              )}
              <Button
                type={ButtonType.ICON}
                size={ButtonSize.SMALL}
                iconLeft="cross-big"
                onClick={() => toastReceiverData.removeToast(id)}
              />
            </Wrapper>
          </Wrapper>
        ))}
      </Wrapper>
    );
  },
);

export default ToastReceiver;
