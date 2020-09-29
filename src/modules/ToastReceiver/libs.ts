import { keyframes } from "styled-components";
import { duration300, duration300Number } from "layout/durations";

import { ToastReceiverData } from "./toastReceiverData";

const firstToastBottom = 40;
export const toastHeight = 48;
export const toastMarginTop = 24;

const opacityFade = {
  show: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,
  hide: keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,
};

export const toastAnimations = {
  showToast: { name: opacityFade.show, duration: duration300, timingFunction: "linear" },
  hideToast: {
    name: opacityFade.hide,
    duration: duration300,
    timingFunction: "linear",
    delay: `${ToastReceiverData.defaultAutoRemoveTime - duration300Number}ms`,
  },
};

export const calcToastBottom = (index: number) => index * (toastMarginTop + toastHeight) + firstToastBottom;
