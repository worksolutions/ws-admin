import React from "react";
import { remove, propEq } from "ramda";

import Dropdown from "primitives/Dropdown/Dropdown";
import Wrapper from "primitives/Wrapper";
import Modal from "primitives/Modal";
import Typography from "primitives/Typography";
import { InputSize, InputTitlePosition } from "primitives/Input/InputWrapper";
import Combobox from "primitives/Combobox/Combobox";
import TokenList from "primitives/TokenList";

import { maxWidth } from "libs/styles";

function Dropdowns() {
  const [value, setValue] = React.useState<string | number | undefined>("new");
  const [comboValues, setComboValues] = React.useState<string[]>([]);

  const [comboboxItems, setComboboxItems] = React.useState(() => [
    {
      title: "Курьерская служба доставки",
      code: "1",
    },
    {
      title: "Самовывоз",
      code: "2",
    },
    {
      title: "Почта России",
      code: "3",
    },
  ]);

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
      <Combobox
        placeholder="Выберите способы доставки"
        selectedItemCodes={comboValues}
        items={comboboxItems}
        onChange={setComboValues}
        onChangeItemsList={setComboboxItems}
      />
      <TokenList
        outerStyles={maxWidth(300)}
        placeholder="некий список"
        items={comboboxItems}
        onCreate={(title) => setComboboxItems([...comboboxItems, { code: Math.random().toString(), title }])}
        onRemove={(code) => setComboboxItems(remove(comboboxItems.findIndex(propEq("code", code)), 1, comboboxItems))}
      />
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
