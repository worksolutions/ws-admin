import React from "react";
import { observer } from "mobx-react-lite";

import Input, { InputSize } from "primitives/Input/Input";
import { Icons } from "primitives/Icon";

import { useEffectSkipFirst } from "libs/hooks";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";

import ClearInputWrapper from "../../../../../primitives/Input/ClearInputWrapper";

import { BlockInterface } from "state/systemState";

export interface InputOptionsInterface {
  placeholder?: string;
  iconLeft?: Icons;
  debounce?: number;
  initialValue?: string;
}

function ActionInput({
  actions,
  options,
  styles,
}: BlockInterface<InputOptionsInterface, "change"> & {
  styles?: any;
}) {
  if (!actions?.change) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const [value, setValue] = React.useState(() => {
    if (!options?.initialValue) return "";
    return insertContext(options.initialValue, appContext.context).value;
  });

  useEffectSkipFirst(() => {
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
