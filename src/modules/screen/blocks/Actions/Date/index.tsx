import React from "react";
import { observer } from "mobx-react-lite";
import { isNil } from "ramda";

import DatePicker, { DatePickerMode } from "primitives/DatePicker";
import { InputSize } from "primitives/Input/InputWrapper";

import { useEffectSkipFirst } from "libs/hooks/common";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useStateContextModel } from "modules/model";

import { BlockInterface } from "state/globalState";

interface DateOptionsInterface {
  cleanable?: boolean;
  contextPath: string;
  hasCurrentDayButton: boolean;
  allowEmpty?: boolean;
  size?: InputSize;
}

type ActionDateInterface = BlockInterface<DateOptionsInterface, "change"> & {
  styles?: any;
};

function ActionDate({ options, actions, styles }: ActionDateInterface) {
  if (!actions?.change) return null;
  if (!options) return null;

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

  if (!resultActions.change) return null;

  return (
    <DatePicker
      disabled={disabled}
      error={!!error}
      tip={error}
      outerStyles={styles}
      initialValue={value}
      size={options.size}
      allowEmpty={options.allowEmpty}
      mode={DatePickerMode.DATE}
      cleanable={options?.cleanable}
      hasCurrentDayButton={isNil(options.hasCurrentDayButton) ? true : options.hasCurrentDayButton}
      onChange={setValue}
    />
  );
}

export default observer(ActionDate);
