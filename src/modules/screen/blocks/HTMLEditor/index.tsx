import React from "react";

import Wrapper from "primitives/Wrapper";
import Editor from "primitives/Editor";
import RadioGroup, { RadioGroupSize } from "primitives/RadioGroup";

import { Aligns, backgroundColor, flex, fullWidth, jc, marginLeft, minHeight } from "libs/styles";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { editorStyles } from "./editorStyles";

import { BlockInterface } from "state/globalState";

const items = [
  { code: "1", title: "Редактор" },
  { code: "2", title: "Превью" },
];

function HTMLEditor({ options, styles }: BlockInterface<{ value: string }> & { styles?: any }) {
  const { value } = insertContext(options!.value, useAppContext().context);
  const [text, setText] = React.useState(() => value);
  const [radioValue, setRadioValue] = React.useState(items[0].code);

  return (
    <Wrapper
      styles={[
        fullWidth,
        minHeight("100%"),
        backgroundColor("gray-blue/01"),
        flex,
        jc(Aligns.CENTER),
        styles,
        editorStyles,
      ]}
    >
      <Editor
        initialText={text}
        onChange={setText}
        uploader={(file) => Promise.resolve(console.log)}
        additionalToolbarElements={{
          atTheEndOfContainer: (
            <Wrapper styles={[marginLeft(25)]}>
              <RadioGroup size={RadioGroupSize.SMALL} active={radioValue} onChange={setRadioValue} items={items} />
            </Wrapper>
          ),
        }}
      />
    </Wrapper>
  );
}

export default React.memo(HTMLEditor);
