import React from "react";
import { observer } from "mobx-react-lite";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import { Icons } from "primitives/Icon";
import Dropdown from "primitives/Dropdown";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { BlockInterface } from "state/systemState";

export enum DropdownSizes {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  ADJUST_WIDTH = "ADJUST_WIDTH",
  ADJUST_CONTENT = "ADJUST_CONTENT",
}

const sizes: Record<DropdownSizes, (sizes: UseMeasureRect) => string | number> = {
  [DropdownSizes.SMALL]: () => 128,
  [DropdownSizes.MEDIUM]: () => 288,
  [DropdownSizes.LARGE]: () => 448,
  [DropdownSizes.ADJUST_WIDTH]: () => "100%",
  [DropdownSizes.ADJUST_CONTENT]: () => 0,
};

function ActionDropdown({ options }: BlockInterface<{}, "change">) {
  if (!options) return null;

  return null;

  // const appContext = useAppContext();
  // const resultActions = useActions(actions, appContext);
  //
  // return (
  //   <Dropdown
  //     type={ButtonType.PRIMARY}
  //     size={ButtonSize.MEDIUM}
  //     iconLeft={options.icon}
  //     loading={resultActions.click.loadingContainer.loading}
  //     onClick={() => resultActions.click.run()}
  //   >
  //     {options.name}
  //   </Dropdown>
  // );
}

export default React.memo(observer(ActionDropdown));
