import React from "react";
import { zIndex_toast } from "layout/zIndexes";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  bottom,
  flex,
  flexColumn,
  height,
  horizontalPadding,
  left,
  marginRight,
  marginTop,
  position,
} from "libs/styles";
import { useEventEmitter } from "libs/events";
import { cb } from "libs/CB";

import globalEventBus from "modules/globalEventBus";

import toastReceiverData from "./toastReceiverData";

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
      <Wrapper styles={[flex, flexColumn, ai(Aligns.CENTER), position("fixed"), left("50%"), bottom(40), zIndex_toast]}>
        {toastReceiverData.toasts.map(({ id, toast: { text, error, cancelButton } }, key) => (
          <Wrapper
            key={key}
            styles={[
              marginTop(24),
              backgroundColor("white"),
              borderRadius(6),
              border(1, error ? "red/05" : "gray-blue/02"),
              flex,
              ai(Aligns.CENTER),
              horizontalPadding(16),
              height(48),
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
        ))}
      </Wrapper>
    );
  },
);

export default ToastReceiver;
