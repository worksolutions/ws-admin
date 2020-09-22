import React from "react";

import { useEventEmitter } from "libs/events";
import { cb } from "libs/CB";

import globalEventBus from "modules/globalEventBus";

import toastReceiverData from "./toastReceiverData";
import Toast from "./Toast";

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
      <>
        {toastReceiverData.toasts.map(({ id, toast }, index) => (
          <Toast key={id} index={index} removeToast={() => toastReceiverData.removeToast(id)} {...toast} />
        ))}
      </>
    );
  },
);

export default ToastReceiver;
