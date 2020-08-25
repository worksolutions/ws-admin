import React from "react";
import { observer } from "mobx-react-lite";

import Dropdown from "primitives/Dropdown/Dropdown";
import { InputSize } from "primitives/Input/InputWrapper";

import Loading from "components/LoadingContainer/Loading";

import { useEffectSkipFirst } from "libs/hooks/common";
import { maxWidth, minWidth, width } from "libs/styles";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { useDataSource } from "modules/context/dataSource/useDataSource";
import { useStateContextModel } from "modules/model";

import { defaultWidths, DefaultWidths } from "../widths";

import { BlockInterface } from "state/globalState";

import SuggestInterface from "types/SuggestInterface";

function ActionDropdown({
  options,
  actions,
  dataSource,
  styles,
}: BlockInterface<{ context: string; width?: DefaultWidths; size?: InputSize }, "change"> & {
  styles?: any;
}) {
  if (!actions?.change) return null;
  if (!options) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);
  const { data, loadingContainer } = useDataSource<SuggestInterface[]>(dataSource!);
  const {
    value,
    model: { disabled, error },
    setValue,
  } = useStateContextModel(options!.context, appContext);

  useEffectSkipFirst(() => {
    resultActions.change.run(value);
  }, [value]);

  if (loadingContainer.loading) return <Loading />;
  if (!resultActions.change) return null;

  const widthValue = defaultWidths[options?.width || DefaultWidths.SMALL];

  return (
    <Dropdown
      outerStyles={[styles, width(widthValue)]}
      styles={[minWidth(widthValue), maxWidth(widthValue)]}
      selectedItemCode={value}
      size={options!.size}
      placeholder="Не выбрано"
      items={data!}
      disabled={disabled}
      error={!!error}
      tip={error}
      onChange={setValue}
    />
  );
}

export default React.memo(observer(ActionDropdown));
