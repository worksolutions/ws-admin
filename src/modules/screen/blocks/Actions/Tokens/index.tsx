import React from "react";
import { observer } from "mobx-react-lite";
import { propEq, remove } from "ramda";
import { v4 as uuidV4 } from "uuid";

import TokenList from "primitives/TokenList";
import Wrapper from "primitives/Wrapper";

import { useEffectSkipFirst } from "libs/hooks/common";
import { width } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import { defaultWidths, DefaultWidths } from "../widths";

import { BlockInterface } from "state/globalState";

export interface TokensOptionsInterface {
  width?: DefaultWidths;
  placeholder?: string;
  contextPath: string;
  canRemove?: boolean;
  canCreate?: boolean;
}

type ActionTokensInterface = BlockInterface<TokensOptionsInterface, "change"> & {
  styles?: any;
};

function ActionTokens({ actions, options, styles }: ActionTokensInterface) {
  if (!actions?.change) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const {
    value,
    model: { disabled, error },
    setValue,
  } = useStateContextModel(options!.contextPath, appContext);

  useEffectSkipFirst(() => {
    resultActions.change.run(value);
  }, [value]);

  const widthValue = defaultWidths[options!.width || DefaultWidths.SMALL];

  function onRemove(code: string) {
    setValue(remove(value.findIndex(propEq("code", code)), 1, value));
  }

  function onCreate(title: string) {
    setValue([...(value || []), { code: uuidV4(), title }]);
  }

  return (
    <Wrapper styles={styles}>
      <TokenList
        error={!!error}
        tip={error}
        disabled={disabled}
        outerStyles={[width(widthValue)]}
        placeholder={options!.placeholder || "Не заполнено"}
        items={value || []}
        canCreate={options!.canCreate}
        canRemove={options!.canRemove}
        onCreate={onCreate}
        onRemove={onRemove}
      />
    </Wrapper>
  );
}

export default React.memo(observer(ActionTokens));
