import { BlockInterface, ContainSlotsInterface } from "state/globalState";

export interface PageModalInterface {
  title: string;
  subTitle?: string;
  block: BlockInterface;
  actionBlock: BlockInterface;
}

export interface CommonPageInterface extends ContainSlotsInterface {
  modals?: Record<string, PageModalInterface>;
}
