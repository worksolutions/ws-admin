import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import { BlockInterface } from "state/globalState";

function ActionButton({
  actions,
  options,
}: BlockInterface<{ name: string; icon?: Icons; buttonType?: ButtonType }, "click">) {
  if (!actions?.click) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  return (
    <Button
      type={options.buttonType || ButtonType.PRIMARY}
      size={ButtonSize.MEDIUM}
      iconLeft={options.icon}
      loading={resultActions.click.loadingContainer.loading}
      onClick={() => resultActions.click.run(Math.random().toString())}
    >
      {options.name}
    </Button>
  );
}

export default React.memo(observer(ActionButton));
