import React from "react";

import Dropdown from "primitives/Dropdown/Dropdown";
import Wrapper from "primitives/Wrapper";
import Modal from "primitives/Modal";
import Typography from "primitives/Typography";
import { InputSize, InputTitlePosition } from "primitives/Input/InputWrapper";

function Dropdowns() {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  return (
    <Wrapper>
      <Dropdown
        searchable
        title="Сверху:"
        error
        tip="тест123"
        selectedItemCode={value}
        placeholder="тест 1"
        items={[
          { title: "Выбранный длинный пункт", code: "new" },
          { title: "по дате", code: "date" },
        ]}
        onChange={setValue}
        optionalAction={{
          title: "Добавить категорию",
          icon: "plus-big",
          onClick: () => alert("На втором дропдауне есть модалка"),
        }}
      />
      <Modal
        title="Окно 1"
        subTitle="Модальное окно"
        wrappedContent={(open) => (
          <Dropdown
            searchable
            title="Сбоку:"
            titlePosition={InputTitlePosition.LEFT}
            size={InputSize.LARGE}
            selectedItemCode={value}
            placeholder="тест 1"
            items={[
              {
                title: "Выбранный длинный пункт",
                code: "new",
                subtitle: "Еще один тайтл • email@worksolutions.ru",
                leftContent: "user",
              },
            ]}
            onChange={setValue}
            optionalAction={{ title: "Добавить категорию", icon: "plus-big", onClick: open }}
          />
        )}
        primaryActionText="Закрыть"
        closeOnBackdropClick
        onPrimaryAction={(close) => close()}
      >
        {() => <Typography>Hello</Typography>}
      </Modal>
      {/*<Dropdown*/}
      {/*  selectedItemCode={value}*/}
      {/*  placeholder="тест 1"*/}
      {/*  groupedItems={[*/}
      {/*    {*/}
      {/*      groupName: "Группа 1",*/}
      {/*      items: [*/}
      {/*        { title: "по новизне", code: "new" },*/}
      {/*        { title: "по дате", code: "date" },*/}
      {/*      ],*/}
      {/*    },*/}
      {/*    {*/}
      {/*      groupName: "Группа 2",*/}
      {/*      items: [*/}
      {/*        { title: "по новизне", code: "new2" },*/}
      {/*        { title: "по дате", code: "date2" },*/}
      {/*      ],*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  onChange={setValue}*/}
      {/*/>*/}
    </Wrapper>
  );
}

export default React.memo(Dropdowns);
