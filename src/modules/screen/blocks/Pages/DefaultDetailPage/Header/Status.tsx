import React from "react";
import { observer } from "mobx-react-lite";

import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";

import HeaderStatusBar from "../../common/HeaderStatusBar";

export interface PageHeaderStatusInterface {
  title: string;
  badgeColor?: string;
}

function PageHeaderStatus({ title, styles, badgeColor }: PageHeaderStatusInterface & { styles?: any }) {
  const appContext = useAppContext();

  const enhancedTitle = insertContext(title, appContext.context);
  const enhancedBadgeColor = insertContext(badgeColor, appContext.context);

  return <HeaderStatusBar styles={styles} title={enhancedTitle.value} badgeColor={enhancedBadgeColor.value} />;
}

export default React.memo(observer(PageHeaderStatus));
