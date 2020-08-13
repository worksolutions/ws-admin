import React from "react";
import { observer } from "mobx-react-lite";
import { isNil } from "ramda";

import DatePicker, { DatePickerMode } from "primitives/DatePicker";
import { InputSize } from "primitives/Input/InputWrapper";
import ClearInputWrapper from "primitives/Input/ClearInputWrapper";

import { useEffectSkipFirst } from "libs/hooks/common";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

function ActionRadioGroup({
  options,
  actions,
  styles,
}: BlockInterface<{ value: string; hasCurrentDayButton: boolean; allowEmpty?: boolean; size?: InputSize }, "change"> & {
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
    <ClearInputWrapper needShow={!!value} clear={() => setValue(null)}>
      <DatePicker
        outerStyles={styles}
        initialValue={value}
        size={options.size}
        allowEmpty={options.allowEmpty}
        mode={DatePickerMode.DATE}
        hasCurrentDayButton={isNil(options.hasCurrentDayButton) ? true : options.hasCurrentDayButton}
        onChange={setValue}
      />
    </ClearInputWrapper>
  );
}

export default React.memo(observer(ActionRadioGroup));
