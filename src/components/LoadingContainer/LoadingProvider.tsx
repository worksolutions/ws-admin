import React, { Ref } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";

import Wrapper from "../../primitives/Wrapper";
import { absoluteCenter, Colors } from "../../libs/styles";
import Spinner from "../../primitives/Spinner";

import { ProviderLogic, providerLogicStore } from "./LoadingProviderLogic";

function LoadingProvider({
  children,
  size,
  color,
}: {
  children: (loadingProviderRef: Ref<HTMLElement | undefined>) => JSX.Element;
  size?: number;
  color?: Colors;
}) {
  const id = React.useMemo(() => providerLogicStore.generateId(), []);
  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.position = "relative";
      ref.current.setAttribute(ProviderLogic.attributeName, id.toString());
      providerLogicStore.providers[id] = { spinnerCount: 0 };
    }

    return () => {
      providerLogicStore.providers[id].spinnerCount = 0;
    };
  }, []);

  const needShowSpinner = providerLogicStore.providers[id]?.spinnerCount !== 0 && !!ref.current;
  const [realShowSpinner, setRealShowSpinner] = React.useState(needShowSpinner);
  const timerRef = React.useRef<any>();

  React.useEffect(() => {
    clearTimeout(timerRef.current);
    if (needShowSpinner) {
      setRealShowSpinner(true);
      return;
    }

    timerRef.current = setTimeout(() => {
      setRealShowSpinner(false);
    }, 16);
  }, [needShowSpinner]);

  return (
    <>
      {children(ref)}
      {realShowSpinner &&
        ReactDOM.createPortal(
          <Wrapper styles={absoluteCenter}>
            <Spinner color={color} size={size} />
          </Wrapper>,
          ref.current!,
        )}
    </>
  );
}

export default observer(LoadingProvider);
