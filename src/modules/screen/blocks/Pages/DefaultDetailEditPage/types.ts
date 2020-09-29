import { PageHeaderInterface } from "../common/Header";
import { CommonPageInterface } from "../common/types";

import { BlockInterface } from "state/globalState";

export type DefaultDetailEditPageInterface = CommonPageInterface &
  BlockInterface<
    PageHeaderInterface & { saveOptions: { context: string; requiredContextFields?: string[] } },
    "save" | "discard"
  >;
