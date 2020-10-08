import React from "react";
import ReactDOM from "react-dom";
import { isNil, without } from "ramda";
import { zIndex_modal } from "layout/zIndexes";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";

import {
  backgroundColor,
  bottom,
  createAlphaColor,
  display,
  fullHeight,
  fullWidth,
  left,
  overflow,
  position,
  right,
  textAlign,
  top,
  verticalAlign,
} from "libs/styles";
import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";

import { activeModal, ModalContent, ModalInterface, ModalSize } from "./ModalContent";

const root = document.getElementById("root")!;

function Modal({
  actionBlock,
  opened: openedProp,
  size = ModalSize.SMALL,
  wrappedContent,
  title,
  onSecondaryAction,
  onPrimaryAction,
  secondaryActionText,
  primaryActionText,
  subTitle,
  onClose,
  children,
  secondaryActionLoading,
  primaryActionLoading,
  actionsInColumn,
  closeOnBackdropClick,
}: ModalInterface) {
  const [opened, open, close] = useBoolean(() => (isNil(openedProp) ? false : openedProp));

  useEffectSkipFirst(() => {
    if (openedProp) {
      open();
      return;
    }
    close();
  }, [openedProp]);

  const modalId = React.useMemo(activeModal.getModalId, []);

  React.useEffect(() => {
    if (opened) {
      activeModal.activeModals.push(modalId);
      return;
    }
    activeModal.activeModals = without([modalId], activeModal.activeModals);
  }, [opened]);

  useEffectSkipFirst(() => {
    if (opened) return;
    onClose && onClose();
  }, [opened]);

  return (
    <>
      {wrappedContent && wrappedContent(open)}
      {opened &&
        ReactDOM.createPortal(
          <Wrapper
            styles={[
              zIndex_modal,
              position("fixed"),
              left(0),
              top(0),
              bottom(0),
              right(0),
              overflow("overlay"),
              backgroundColor(createAlphaColor("gray-blue/09", 122)),
            ]}
          >
            <Wrapper styles={[position("absolute"), left(0), top(0), fullWidth, fullHeight, textAlign("center")]}>
              <Wrapper styles={[display("inline-block"), fullHeight, verticalAlign("middle")]} />
              <ModalContent
                actionBlock={actionBlock}
                closeOnBackdropClick={closeOnBackdropClick}
                id={modalId}
                size={size}
                title={title}
                close={close}
                subTitle={subTitle}
                onPrimaryAction={onPrimaryAction}
                onSecondaryAction={onSecondaryAction}
                primaryActionText={primaryActionText}
                secondaryActionText={secondaryActionText}
                primaryActionLoading={primaryActionLoading}
                secondaryActionLoading={secondaryActionLoading}
                actionsInColumn={actionsInColumn}
              >
                {children && children()}
              </ModalContent>
            </Wrapper>
          </Wrapper>,
          root,
        )}
    </>
  );
}

export default React.memo(observer(Modal));
