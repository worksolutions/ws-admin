import React from "react";

import Dropdown, { DropdownSize, DropdownTitlePosition } from "primitives/Dropdown";
import Wrapper from "primitives/Wrapper";

function Dropdowns() {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  return (
    <Wrapper>
      <Dropdown
        title="Сверху:"
        selectedItemId={value}
        placeholder="тест 1"
        items={[
          { title: "Выбранный длинный пункт", id: "new" },
          { title: "по дате", id: "date" },
        ]}
        onChange={setValue}
      />
      <Dropdown
        title="Сбоку:"
        titlePosition={DropdownTitlePosition.LEFT}
        size={DropdownSize.LARGE}
        selectedItemId={value}
        placeholder="тест 1"
        items={[
          { title: "Выбранный длинный пункт", id: "new" },
          { title: "по дате", id: "date" },
        ]}
        onChange={setValue}
      />
      <Dropdown
        selectedItemId={value}
        placeholder="тест 1"
        groupedItems={[
          {
            groupName: "Группа 1",
            items: [
              { title: "по новизне", id: "new" },
              { title: "по дате", id: "date" },
            ],
          },
          {
            groupName: "Группа 2",
            items: [
              { title: "по новизне", id: "new2" },
              { title: "по дате", id: "date2" },
            ],
          },
        ]}
        onChange={setValue}
      />
    </Wrapper>
  );
}

export default React.memo(Dropdowns);
