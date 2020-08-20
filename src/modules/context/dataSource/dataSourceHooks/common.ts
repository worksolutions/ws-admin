import { LoadingContainer } from "state/loadingContainer";

export interface DataSourceResultInterface<RESULT = any> {
  data: RESULT | null;
  initialData: RESULT | null;
  loadingContainer: LoadingContainer;
  reload: () => void;
  updateInitial: (data: RESULT | null) => void;
}
