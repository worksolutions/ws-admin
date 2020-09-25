import React from "react";
import { observer } from "mobx-react-lite";

import { InputSize } from "primitives/Input/InputWrapper";
import Input from "primitives/Input/Input";

import { active, backgroundColor, borderBottom, borderRadius, flexValue, focus, hover, paddingLeft } from "libs/styles";
import { emptyBoxShadow } from "libs/styles/cleaner";
import { useEffectSkipFirst } from "libs/hooks/common";

import { UseActionResultAction } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { useStateFromContext } from "modules/context/insertContext";

interface SearchInterface {
  context: string;
  placeholder?: string;
  searchAction: UseActionResultAction;
}

function Search({ searchAction, context, placeholder }: SearchInterface) {
  const appContext = useAppContext();
  const [value, setValue] = useStateFromContext(context, appContext);

  useEffectSkipFirst(() => {
    searchAction.run(value);
  }, [value]);

  return (
    <Input
      placeholder={placeholder || "Найти в списке"}
      autofocus
      iconRight="search-big"
      styles={[
        borderBottom(1, "gray-blue/02"),
        backgroundColor("white"),
        paddingLeft(4),
        borderRadius(0),
        emptyBoxShadow,
        hover(emptyBoxShadow),
        focus(emptyBoxShadow),
        active(emptyBoxShadow),
      ]}
      size={InputSize.LARGE}
      outerStyles={flexValue(1)}
      value={value}
      onChange={setValue}
    />
  );
}

export default React.memo(observer(Search));
