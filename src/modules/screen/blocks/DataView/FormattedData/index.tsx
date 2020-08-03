import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { useLocalStorage } from "libs/hooks";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import ViewPresenter from "./ViewPresenter";
import { FormattedDataViewInterface } from "./types";
import { getFormattedDataLocalStorageInitialValue } from "./libs";

function FormattedDataView({ options, ...otherProps }: FormattedDataViewInterface) {
  const [initialized, setInitialized] = React.useState(false);

  const [storage] = useLocalStorage(options!.id, () => getFormattedDataLocalStorageInitialValue(options!.showMode));

  const appContext = useAppContext();
  const paginationViewActions = useActions(options?.paginationView.actions!, appContext);

  React.useEffect(() => {
    paginationViewActions.change
      .run({ page: 1, perPage: storage.perPage || options!.paginationView.options!.paginationItems[0] })
      .then(() => setInitialized(true));
  }, []);

  if (!initialized) return <Spinner size={36} />;

  return <ViewPresenter options={options} {...otherProps} />;
}

export default React.memo(observer(FormattedDataView));
