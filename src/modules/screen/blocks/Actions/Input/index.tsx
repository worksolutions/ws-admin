import React from "react";
import { observer } from "mobx-react-lite";

import Input, { InputSize } from "primitives/Input/Input";
import { Icons } from "primitives/Icon";
import ClearInputWrapper from "primitives/Input/ClearInputWrapper";

import { useEffectSkipFirst } from "libs/hooks/common";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

export interface InputOptionsInterface {
  placeholder?: string;
  iconLeft?: Icons;
  debounce?: number;
  value: string;
}

type ActionInputType = BlockInterface<InputOptionsInterface, "change"> & {
  styles?: any;
  onChange?: (text: string) => void;
};

function ActionInput({ actions, options, styles, onChange }: ActionInputType) {
  if (!actions?.change) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const [value, setValue] = React.useState(() => insertContext(options!.value, appContext.context).value);

  useEffectSkipFirst(() => {
    if (onChange) onChange(value);
    resultActions.change.run(value);
  }, [value]);

  return (
    <ClearInputWrapper needShow={!!value} clear={() => setValue("")}>
      <Input
        outerStyles={styles}
        size={InputSize.MEDIUM}
        value={value}
        placeholder={options?.placeholder}
        iconLeft={options?.iconLeft}
        debounce={options?.debounce}
        onChange={setValue}
      />
    </ClearInputWrapper>
  );
}

export default React.memo(observer(ActionInput));
