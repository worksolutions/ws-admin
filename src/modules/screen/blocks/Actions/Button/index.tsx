import React from "react";
import { observer } from "mobx-react-lite";

import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { Icons } from "primitives/Icon";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import { BlockInterface } from "state/globalState";

function ActionButton({
  actions,
  options,
}: BlockInterface<
  { contextPath?: string; name: string; icon?: Icons; type?: ButtonType; size?: ButtonSize },
  "click"
>) {
  if (!actions?.click) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const disabled = options!.contextPath ? useStateContextModel(options!.contextPath, appContext).model.disabled : false;

  return (
    <Button
      disabled={disabled || resultActions.click.loadingContainer.loading}
      type={options.type || ButtonType.PRIMARY}
      size={options.size || ButtonSize.MEDIUM}
      iconLeft={options.icon}
      loadingLeft={resultActions.click.loadingContainer.loading}
      onClick={() => resultActions.click.run()}
    >
      {options.name}
    </Button>
  );
}

export default React.memo(observer(ActionButton));
