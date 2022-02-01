import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import LazyLoad from "vanilla-lazyload";

import Loading from "components/LoadingContainer/Loading";

import { loadBlockComponent } from "./libs";

import { BlockInterface } from "state/globalState";

import { SelectorsEnum } from "../../../primitives/Editor/plugins/imageStack/enums";

function BlockRenderer(props: BlockInterface & { styles?: any; type?: string; spinnerSize?: number }) {
  const [BlockComponent, setBlockComponent] = useState<FC<BlockInterface>>();

  useEffect(() => {
    loadBlockComponent(props.type!, (value) => {
      setBlockComponent(value);
    });
  }, []);

  useEffect(() => {
    if (props.type !== "FormattedHTMLText") return;

    new LazyLoad({ data_src: "src", elements_selector: `.${SelectorsEnum.imageStack} img` });
  }, [BlockComponent]);

  if (!BlockComponent) {
    return <Loading />;
  }

  return <BlockComponent {...props} />;
}

export default React.memo(observer(BlockRenderer));
