import { ModalSize } from "primitives/Modal/ModalContent";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

export interface PageModalInterface {
  title: string;
  subTitle?: string;
  block: BlockInterface;
  actionBlock: BlockInterface;
  size?: ModalSize;
}

export interface CommonPageInterface extends ContainSlotsInterface {
  modals?: Record<string, PageModalInterface>;
}
