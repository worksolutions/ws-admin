import React from "react";
import { observer } from "mobx-react-lite";

import Spinner from "primitives/Spinner";

import { useLocalStorage } from "libs/hooks";

import { useAppContext } from "modules/context/hooks/useAppContext";
import { useActions } from "modules/context/actions/useActions";

import FormattedDataView from "./View";
import { FormattedDataViewInterface } from "./types";
import { formattedDataLocalStorageInitialValue } from "./libs";

function FormattedDataViewInitializer({ options, ...otherProps }: FormattedDataViewInterface) {
  const paginationEnabled = options?.paginationView.options?.enabled;
  const [initialized, setInitialized] = React.useState(false);

  const [storage] = useLocalStorage(options!.id, formattedDataLocalStorageInitialValue);

  const appContext = useAppContext();
  const paginationViewActions = useActions(options?.paginationView.actions!, appContext);

  React.useEffect(() => {
    if (paginationEnabled) {
      paginationViewActions.change
        .run({ page: 1, perPage: storage.perPage || options!.paginationView.options!.paginationItems[0] })
        .then(() => setInitialized(true));
      return;
    }
    setInitialized(true);
  }, []);

  if (!initialized) return <Spinner size={36} />;

  return <FormattedDataView options={options} {...otherProps} />;
}

export default React.memo(observer(FormattedDataViewInitializer));
