import React from "react";
import { useDropArea } from "react-use";

import { AcceptTypes } from "./helpers/inputAccept";
import { convertFileToFileInterface, createFileInput } from "./helpers/createFileInput";

import FileInterface from "types/FileInterface";

export function useFileSelector(onChange: (file: FileInterface) => void, acceptTypes?: AcceptTypes[]) {
  const [input] = React.useState(() => createFileInput(false, acceptTypes));

  const [dropAreaProps, dropAreaState] = useDropArea({
    onFiles: ([file]) => onChange(convertFileToFileInterface(file)),
  });

  React.useEffect(() => input.destroy, []);

  return {
    dropAreaProps,
    dropping: dropAreaState.over,
    openNativeFileDialog: () => input.open(([file]) => onChange(convertFileToFileInterface(file))),
  };
}
