import React from "react";
import { observer } from "mobx-react-lite";
import { UseMeasureRect } from "react-use/lib/useMeasure";

import { Icons } from "primitives/Icon";
import Dropdown from "primitives/Dropdown";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { BlockInterface } from "state/globalState";

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
