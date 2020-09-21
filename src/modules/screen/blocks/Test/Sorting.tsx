import React from "react";

import Sorting, { SortingElementInterface } from "components/Sorting";

function SortingElement() {
  const [sorting, setSorting] = React.useState<SortingElementInterface>({
    id: "new",
  });

  return (
    <Sorting
      items={[
        { title: "по новизне", id: "new", hasDirection: false },
        { title: "по дате создания", id: "date", hasDirection: true },
      ]}
      selected={sorting}
      onChange={(id, direction) => {
        setSorting({ id, direction });
      }}
    />
  );
}

export default SortingElement;
