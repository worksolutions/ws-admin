import React from "react";

import Wrapper from "primitives/Wrapper";
import Button from "primitives/Button";
import Modal from "primitives/Modal";
import { modalHorizontalPadding, ModalSize } from "primitives/Modal/ModalContent";
import Typography from "primitives/Typography";
import Dropdown from "primitives/Dropdown/Dropdown";

import { horizontalPadding } from "libs/styles";

function Modals() {
  const [primaryLoading, setPrimaryLoading] = React.useState(false);
  const [actionsInColumn, setActionsInColumn] = React.useState(false);
  const [size, setSize] = React.useState(ModalSize.SMALL);
  return (
    <Wrapper>
      <Modal
        size={size}
        title="Модальное окно 1"
        subTitle="Вы уверены, что это модальное окно открыто?? И еще некий текст на новой строке"
        wrappedContent={(open) => <Button onClick={open}>Модальное окно</Button>}
        primaryActionText="Действие 1"
        closeOnBackdropClick={true}
        onPrimaryAction={(close) => {
          setPrimaryLoading(true);
          setTimeout(() => {
            setPrimaryLoading(false);
            close();
          }, 1000);
        }}
        primaryActionLoading={primaryLoading}
        actionsInColumn={actionsInColumn}
        secondaryActionText="Переставить действия"
        onSecondaryAction={() => setActionsInColumn(!actionsInColumn)}
      >
        {() => (
          <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>
            <Typography>Тут некий контент</Typography>
            <Dropdown
              selectedItemCode={size}
              placeholder="тест 1"
              items={[
                { title: "SMALL", code: ModalSize.SMALL },
                { title: "ADJUST_CONTENT", code: ModalSize.ADJUST_CONTENT },
                { title: "FULL_WIDTH", code: ModalSize.FULL_WIDTH },
              ]}
              onChange={setSize}
            />
            <Modal
              size={size}
              title="Модальное окно 2"
              subTitle="1"
              closeOnBackdropClick={false}
              wrappedContent={(open) => <Button onClick={open}>Модальное окно 2</Button>}
            >
              {() => (
                <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>
                  <Typography>Modal 2</Typography>
                </Wrapper>
              )}
            </Modal>
          </Wrapper>
        )}
      </Modal>
    </Wrapper>
  );
}

export default React.memo(Modals);
