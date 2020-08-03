import React from "react";

import Icon from "primitives/Icon";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import DroppedList, { DroppedListOpenMode } from "primitives/List/DroppedList";
import Wrapper from "primitives/Wrapper";

import { firstChild, flex, marginLeft } from "libs/styles";

import { CellComponentData } from "../types";
import { cellDefaultHorizontalPadding } from "../../../libs/paddings";

const buttonMarginLeft = 12;
const buttonWidth = 24;

export const cellComponent: CellComponentData = ({ item }) => {
  return {
    component: (
      <Wrapper styles={flex}>
        {item.value.map((action: any, key: number) => {
          if (action.mode === "button") {
            return (
              <Button
                styles={[marginLeft(buttonMarginLeft), firstChild(marginLeft(0), "&")]}
                key={key}
                type={ButtonType.ICON}
                size={ButtonSize.SMALL}
                iconLeft={action.icon}
                onClick={() => console.log("click")}
              />
            );
          }

          if (action.mode === "dropdown") {
            return (
              <DroppedList
                mode={DroppedListOpenMode.HOVER}
                margin={4}
                items={action.items.map((item: any) => ({
                  // TODO: make actions like card
                  id: item.name,
                  title: item.name,
                  leftContent: item.icon ? <Icon icon={item.icon} color={item.iconColor} /> : null,
                }))}
                onChange={() => console.log("change")}
              >
                {(state, parentRef, subChild) => (
                  <Button
                    styles={[marginLeft(buttonMarginLeft), firstChild(marginLeft(0), "&")]}
                    ref={parentRef}
                    type={ButtonType.ICON}
                    size={ButtonSize.SMALL}
                    iconLeft="kebab-horizontal"
                    onClick={state.toggle}
                  >
                    {subChild}
                  </Button>
                )}
              </DroppedList>
            );
          }
          return null;
        })}
      </Wrapper>
    ),
    cellWidth:
      cellDefaultHorizontalPadding + item.value.length * buttonWidth + buttonMarginLeft * (item.value.length - 1),
  };
};
