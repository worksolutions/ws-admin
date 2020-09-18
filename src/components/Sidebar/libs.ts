import { useRouteMatch } from "react-router";

export function useTreeElementIsActive(to: string) {
  const match = useRouteMatch({
    path: to,
    exact: false,
  });
  return !!match;
}
