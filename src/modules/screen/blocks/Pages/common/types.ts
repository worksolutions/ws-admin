import { ModalSize } from "primitives/Modal/ModalContent";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

import { AnyRawAction, ContainsRawActions } from "types/Actions";

export interface PageModalInterface<A extends string = string>
  extends Partial<ContainsRawActions<Record<A, AnyRawAction>>> {
  title: string;
  subTitle?: string;
  block: BlockInterface;
  actionBlock: BlockInterface;
  size?: ModalSize;
}

export interface CommonPageInterface extends ContainSlotsInterface {
  modals?: Record<string, PageModalInterface>;
}
