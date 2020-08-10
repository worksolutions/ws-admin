import React from "react";
import { observer } from "mobx-react-lite";

import RadioGroup, { RadioGroupSize } from "primitives/RadioGroup";
import Spinner from "primitives/Spinner";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import { useEffectSkipFirst } from "../../../../../libs/hooks/common";

import { BlockInterface } from "state/globalState";

import SuggestInterface from "types/SuggestInterface";

function ActionRadioGroup({
  options,
  actions,
  dataSource,
  styles,
}: BlockInterface<{ value: string }, "change"> & {
  styles?: any;
}) {
  if (!actions?.change) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const itemsData = useDataSource<SuggestInterface[]>(dataSource!);
  const [value, setValue] = React.useState(() => insertContext(options.value, appContext.context).value);

  useEffectSkipFirst(() => {
    resultActions.change.run(value);
  }, [value]);

  if (itemsData.loadingContainer.loading) return <Spinner />;
  if (!resultActions.change) return null;

  return (
    <RadioGroup
      styles={styles}
      size={RadioGroupSize.MEDIUM}
      active={value}
      items={itemsData.data || []}
      onChange={setValue}
    />
  );
}

export default React.memo(observer(ActionRadioGroup));
