import React from "react";

import Wrapper from "primitives/Wrapper";
import Editor from "primitives/Editor";

import { Aligns, backgroundColor, flex, fullWidth, jc, minHeight } from "libs/styles";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import { BlockInterface } from "state/globalState";

function HTMLEditor({ options, styles }: BlockInterface<{ value: string }> & { styles?: any }) {
  const { value } = insertContext(options!.value, useAppContext().context);
  const [text, setText] = React.useState(() => value);

  return (
    <Wrapper styles={[backgroundColor("gray-blue/01"), fullWidth, flex, jc(Aligns.CENTER), minHeight("100%"), styles]}>
      <Editor
        initialText={text}
        onChange={setText}
        onInit={() => {}}
        uploader={(file) => Promise.resolve(console.log)}
      />
    </Wrapper>
  );
}

export default React.memo(HTMLEditor);
