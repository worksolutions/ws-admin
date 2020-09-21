import { action, observable } from "mobx";
import { without } from "ramda";

import { BaseToastInterface } from "../globalEventBus";

interface ToastInterface {
  id: number;
  removeSubscriber: any;
  toast: BaseToastInterface;
}

class ToastReceiverData {
  static defaultAutoRemoveTime = 4000;

  @observable toasts: ToastInterface[] = [];

  private _id = 0;

  private generateId() {
    return this._id++;
  }

  @action.bound
  addToast(toast: BaseToastInterface) {
    const newToast = { id: this.generateId(), removeSubscriber: null, toast };
    this.toasts.push(newToast);
    this.subscribeToastRemove(newToast);
  }

  @action.bound
  removeToast(toastId: number) {
    this.deleteToastFromList(toastId);
    this.unSubscribeToastRemove(toastId);
  }

  private findToast(toastId: number) {
    return this.toasts.find((savedToast) => savedToast.id === toastId);
  }

  @action
  private deleteToastFromList(toastId: number) {
    const foundToast = this.findToast(toastId);
    if (!foundToast) return;
    this.toasts = without([foundToast], this.toasts);
  }

  private subscribeToastRemove(toast: ToastInterface) {
    const foundToast = this.findToast(toast.id);
    if (!foundToast) return;
    foundToast.removeSubscriber = setTimeout(
      () => this.deleteToastFromList(toast.id),
      ToastReceiverData.defaultAutoRemoveTime,
    );
  }

  private unSubscribeToastRemove(toastId: number) {
    const foundToast = this.findToast(toastId);
    if (!foundToast) return;
    clearTimeout(foundToast.removeSubscriber);
  }
}

export default new ToastReceiverData();
