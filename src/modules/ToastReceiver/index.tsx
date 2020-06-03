import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  bottom,
  flex,
  left,
  marginTop,
  padding,
  position,
} from "libs/styles";
import { useEventEmitter } from "libs/events";
import { cb } from "libs/CB";

import globalEventBus from "../globalEventBus";

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
      <Wrapper styles={[position("fixed"), left(40), bottom(40)]}>
        {toastReceiverData.toasts.map(({ id, toast: { text, cancelButton } }, key) => (
          <Wrapper
            key={key}
            styles={[
              marginTop(24),
              backgroundColor("white"),
              borderRadius(4),
              border(1, "gray-blue/03"),
              flex,
              ai(Aligns.SPACE_BETWEEN),
              padding("12px 16px"),
            ]}
          >
            <Typography color="gray-blue/09">{text}</Typography>
            {cancelButton && (
              <Typography color="gray-blue/09" type="body1-semi-bold">
                {cancelButton.text}
              </Typography>
            )}
            <button onClick={() => toastReceiverData.removeToast(id)}>x</button>
          </Wrapper>
        ))}
      </Wrapper>
    );
  },
);

export default ToastReceiver;
