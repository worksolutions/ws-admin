import React from "react";
import { isNil } from "ramda";

import Typography from "primitives/Typography";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { BlockInterface } from "state/globalState";

function SimpleText({
  options,
  styles,
}: BlockInterface<{ value: string | number; emptyValue?: string | number }> & { styles?: any }) {
  const text = insertContext(options!.value, useAppContext().context);
  if (text.value === "" || isNil(text.value))
    return (
      <Typography color="gray-blue/04" styles={styles}>
        {options!.emptyValue || "Нет"}
      </Typography>
    );
  return <Typography styles={styles}>{text.value}</Typography>;
}

export default React.memo(SimpleText);
