import React from "react";
import { matchPath, useLocation } from "react-router";

import { SidebarItemInterface } from "../SecondarySideMenu/types";

function findPath(pathname: string, items: SidebarItemInterface[]): SidebarItemInterface[] {
  const found = items.find((item) => matchPath(pathname, { path: item.to }));
  if (!found) return [];
  if (!found.subElements) return [found];
  return [found, ...findPath(pathname, found.subElements)];
}

export function useBreadcrumbsWay(sidebarItems: SidebarItemInterface[]) {
  const location = useLocation();
  return React.useMemo(() => {
    if (sidebarItems.length === 0) return [];
    return findPath(location.pathname, sidebarItems);
  }, [location, sidebarItems]);
}
