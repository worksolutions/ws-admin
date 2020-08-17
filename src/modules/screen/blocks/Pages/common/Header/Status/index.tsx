import React from "react";
import { observer } from "mobx-react-lite";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import StaticStatusBar from "./StaticStatusBar";

export interface StatusInterface {
  title: string;
  badgeColor?: string;
}

function Status({ title, styles, badgeColor }: StatusInterface & { styles?: any }) {
  const appContext = useAppContext();

  const enhancedTitle = insertContext(title, appContext.context);
  const enhancedBadgeColor = insertContext(badgeColor, appContext.context);

  return <StaticStatusBar styles={styles} title={enhancedTitle.value} badgeColor={enhancedBadgeColor.value} />;
}

export default React.memo(observer(Status));
