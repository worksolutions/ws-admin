import { EventEmitter } from "libs/events";

export default new EventEmitter<{
  ADD_TOAST: BaseToastInterface;
  OPEN_PAGE_MODAL: { name: string; data?: Record<string, any> };
  CLOSE_PAGE_MODAL: string;
  FORCE_DATA_SOURCE_RELOAD: string;
}>();

export interface BaseToastInterface {
  text: string;
  error?: boolean;
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
}
