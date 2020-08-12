import React from "react";
import { observer } from "mobx-react-lite";
import { isNil } from "ramda";

import DatePicker, { DatePickerMode } from "primitives/DatePicker";
import { InputSize } from "primitives/Input/InputWrapper";

import { useEffectSkipFirst } from "libs/hooks/common";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

function ActionRadioGroup({
  options,
  actions,
  styles,
}: BlockInterface<{ value: string; hasCurrentDayButton: boolean; size?: InputSize }, "change"> & {
  styles?: any;
}) {
  if (!actions?.change) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const [value, setValue] = React.useState(() => insertContext(options.value, appContext.context).value);
  useEffectSkipFirst(() => {
    resultActions.change.run(value);
  }, [value]);

  if (!resultActions.change) return null;

  return (
    <DatePicker
      outerStyles={styles}
      size={options.size}
      mode={DatePickerMode.DATE}
      hasCurrentDayButton={isNil(options.hasCurrentDayButton) ? true : options.hasCurrentDayButton}
      onChange={setValue}
    />
  );
}

export default React.memo(observer(ActionRadioGroup));
