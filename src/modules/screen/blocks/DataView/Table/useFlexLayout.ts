import { Hooks } from "react-table";

export function useFlexLayout(hooks: Hooks) {
  hooks.getRowProps.push(getRowStyles);
  hooks.getHeaderGroupProps.push(getRowStyles);
  hooks.getHeaderProps.push(getHeaderProps);
  hooks.getCellProps.push(getCellProps);
}

useFlexLayout.pluginName = "useCustomFlexLayout";

const getRowStyles = (props: any, { instance }: any) => [
  props,
  {
    style: {
      // display: "flex",
      // flex: "1 0 auto",
      minWidth: `${instance.totalColumnsMinWidth}px`,
    },
  },
];

const getHeaderProps = (props: any, { column }: any) => [
  props,
  {
    style: {
      // flex: column.totalFlexWidth ? `${column.totalFlexWidth} 0 auto` : undefined,
      minWidth: `${column.totalMinWidth}px`,
      // width: `${column.totalWidth}px`,
    },
  },
];

const getCellProps = (props: any, {}: any) => [
  props,
  {
    style: {
      // boxSizing: "border-box",
      // flex: `${cell.column.totalFlexWidth} 0 auto`,
      // minWidth: `${cell.column.totalMinWidth}px`,
      // width: `${cell.column.totalWidth}px`,
    },
  },
];
