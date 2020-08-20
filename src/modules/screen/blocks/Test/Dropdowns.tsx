import React from "react";

import Dropdown, { DropdownSize, DropdownTitlePosition } from "primitives/Dropdown";
import Wrapper from "primitives/Wrapper";

function Dropdowns() {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  return (
    <Wrapper>
      <Dropdown
        title="Сверху:"
        selectedItemCode={value}
        placeholder="тест 1"
        items={[
          { title: "Выбранный длинный пункт", code: "new" },
          { title: "по дате", code: "date" },
        ]}
        onChange={setValue}
      />
      <Dropdown
        title="Сбоку:"
        titlePosition={DropdownTitlePosition.LEFT}
        size={DropdownSize.LARGE}
        selectedItemCode={value}
        placeholder="тест 1"
        items={[
          { title: "Выбранный длинный пункт", code: "new" },
          { title: "по дате", code: "date" },
        ]}
        onChange={setValue}
      />
      <Dropdown
        selectedItemCode={value}
        placeholder="тест 1"
        groupedItems={[
          {
            groupName: "Группа 1",
            items: [
              { title: "по новизне", code: "new" },
              { title: "по дате", code: "date" },
            ],
          },
          {
            groupName: "Группа 2",
            items: [
              { title: "по новизне", code: "new2" },
              { title: "по дате", code: "date2" },
            ],
          },
        ]}
        onChange={setValue}
      />
    </Wrapper>
  );
}

export default React.memo(Dropdowns);
