import { CardActionInterface, CardImageConfig, CardInterface } from "primitives/Card/types";

import { BlockInterface } from "state/systemState";

import { AnyAction } from "types/Actions";

export type CardsViewInterface = BlockInterface<{ imageConfig: CardImageConfig }> & {
  onLoadingUpdate?: (loading: boolean) => void;
};

export type CardsViewDataSource = (Omit<CardInterface, "actions"> & {
  actions?: (Omit<CardActionInterface, "handler"> & { action: AnyAction })[];
})[];
