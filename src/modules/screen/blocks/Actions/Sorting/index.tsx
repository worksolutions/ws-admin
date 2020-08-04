import React from "react";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import Sorting, { SortingElementInterface } from "components/Sorting";

import { ai, Aligns, flex, marginRight } from "libs/styles";
import { useEffectSkipFirst } from "libs/hooks";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";
import { insertContext } from "modules/context/insertContext";

import { BlockInterface } from "state/globalState";

import { SortingItem } from "types/Sorting";

export interface SortingOptionsInterface {
  title?: string;
  items: SortingItem[];
  initialValue?: string;
}

function ActionSorting({
  options,
  actions,
  styles,
}: BlockInterface<SortingOptionsInterface, "change"> & { styles?: any }) {
  if (!actions?.change) return null;

  const appContext = useAppContext();
  const resultActions = useActions(actions, appContext);

  const [sorting, setSorting] = React.useState<SortingElementInterface>(() => {
    if (!options?.initialValue) return { id: options!.items[0].id };
    return insertContext(options.initialValue, appContext.context).value;
  });

  useEffectSkipFirst(() => {
    resultActions.change.run(sorting);
  }, [sorting]);

  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), styles]}>
      {options?.title && (
        <Typography styles={marginRight(8)} color="gray-blue/05">
          {options.title}
        </Typography>
      )}
      <Sorting
        items={options!.items}
        selected={sorting}
        onChange={(id, direction) => {
          setSorting({ id, direction });
        }}
      />
    </Wrapper>
  );
}

export default React.memo(observer(ActionSorting));
