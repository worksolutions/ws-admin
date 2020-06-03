export type DataSourceInterface<Options> = {
  type: "list" | "api";
  options: Options;
};

export type ContainsDataSourceInterface<DataSource> = {
  dataSource: DataSource;
};
