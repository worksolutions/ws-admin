import { PageHeaderInterface } from "../common/Header";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

export type DefaultDetailEditPageInterface = ContainSlotsInterface &
  BlockInterface<
    PageHeaderInterface & { saveOptions: { context: string; requiredContextFields?: string[] } },
    "save" | "discard"
  >;
