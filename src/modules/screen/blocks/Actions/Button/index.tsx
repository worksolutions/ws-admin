import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { BlockInterface } from "state/systemState";

function ActionButton({ actions, options }: BlockInterface<{ name: string; icon?: Icons }, "click">) {
  if (!actions?.click) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  return (
    <Button
      type={ButtonType.PRIMARY}
      size={ButtonSize.MEDIUM}
      iconLeft={options.icon}
      loading={resultActions.click.loadingContainer.loading}
      onClick={() => resultActions.click.run()}
    >
      {options.name}
    </Button>
  );
}

export default React.memo(observer(ActionButton));
