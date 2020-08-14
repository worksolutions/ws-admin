import React from "react";
import ReactDOM from "react-dom";
import { isNil, last, without } from "ramda";
import { elevation32 } from "style/shadows";
import { zIndex_modal } from "layout/zIndexes";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  absoluteCenter,
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  bottom,
  child,
  createAlphaColor,
  firstChild,
  flex,
  flexColumn,
  fullWidth,
  horizontalPadding,
  jc,
  left,
  marginLeft,
  marginTop,
  maxWidth,
  padding,
  position,
  right,
  top,
  verticalPadding,
  width,
} from "libs/styles";
import { useBoolean, useEffectSkipFirst } from "libs/hooks/common";

import Button, { ButtonSize, ButtonType } from "../Button";
import HandleClickOutside from "../HandleClickOutside";

export enum ModalSize {
  ADJUST_CONTENT,
  FULL_WIDTH,
  SMALL,
}

const modalWidthBySize: Record<ModalSize, string | number> = {
  [ModalSize.FULL_WIDTH]: "100%",
  [ModalSize.ADJUST_CONTENT]: "auto",
  [ModalSize.SMALL]: 416,
};

interface ModalInterface {
  size?: ModalSize;
  opened?: boolean;
  wrappedContent?: (open: () => void) => React.ReactNode;
  primaryActionText?: string;
  secondaryActionText?: string;
  primaryActionLoading?: boolean;
  secondaryActionLoading?: boolean;
  actionsInColumn?: boolean;
  title: string;
  subTitle: string;
  closeOnBackdropClick?: boolean;
  children?: () => React.ReactNode;
  onPrimaryAction?: (close: () => void) => void;
  onSecondaryAction?: (close: () => void) => void;
  onClose?: () => void;
}

const root = document.getElementById("root")!;

export const modalHorizontalPadding = 24;

class ActiveModal {
  @observable
  private _modalId = 0;

  @observable
  activeModals: number[] = [];

  @action.bound
  getModalId() {
    return ++this._modalId;
  }
}

const activeModal = new ActiveModal();

const ModalContent = observer(function ({
  size,
  title,
  subTitle,
  close,
  children,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLoading,
  secondaryActionLoading,
  actionsInColumn,
  id,
  closeOnBackdropClick,
}: Required<Pick<ModalInterface, "size" | "title" | "subTitle">> &
  Pick<
    ModalInterface,
    | "primaryActionText"
    | "onPrimaryAction"
    | "secondaryActionText"
    | "onSecondaryAction"
    | "primaryActionLoading"
    | "secondaryActionLoading"
    | "actionsInColumn"
    | "closeOnBackdropClick"
  > & {
    id: number;
    close: () => void;
    children: React.ReactNode;
  }) {
  return (
    <HandleClickOutside
      onClickOutside={close}
      enabled={
        isNil(closeOnBackdropClick) ? true : closeOnBackdropClick ? last(activeModal.activeModals) === id : false
      }
    >
      {(ref) => (
        <Wrapper
          ref={ref}
          styles={[
            maxWidth(`calc(100% - 80px)`),
            absoluteCenter,
            width(modalWidthBySize[size]),
            border(1, "gray-blue/02"),
            backgroundColor("white"),
            elevation32,
            borderRadius(8),
            flex,
            flexColumn,
          ]}
        >
          <Wrapper
            styles={[
              fullWidth,
              flex,
              ai(Aligns.CENTER),
              jc(Aligns.SPACE_BETWEEN),
              padding(`16px ${modalHorizontalPadding}px 8px ${modalHorizontalPadding}px`),
            ]}
          >
            <Typography type="h2-bold">{title}</Typography>
            <Button size={ButtonSize.SMALL} type={ButtonType.ICON} iconLeft="cross-big" onClick={close} />
          </Wrapper>
          <Typography
            color="gray-blue/06"
            styles={[fullWidth, padding(`0 ${modalHorizontalPadding}px 24px ${modalHorizontalPadding}px`)]}
          >
            {subTitle}
          </Typography>
          {children}
          <Wrapper
            styles={[
              fullWidth,
              flex,
              actionsInColumn
                ? [flexColumn, child(marginTop(8)), firstChild(marginTop(0))]
                : [ai(Aligns.CENTER), jc(Aligns.END), child(marginLeft(12)), firstChild(marginLeft(0))],
              verticalPadding(24),
              horizontalPadding(modalHorizontalPadding),
            ]}
          >
            {primaryActionText && onPrimaryAction && (
              <Button
                size={ButtonSize.LARGE}
                type={ButtonType.PRIMARY}
                loading={primaryActionLoading}
                onClick={() => onPrimaryAction(close)}
              >
                {primaryActionText}
              </Button>
            )}
            {secondaryActionText && onSecondaryAction && (
              <Button
                size={ButtonSize.LARGE}
                type={ButtonType.SECONDARY}
                loading={secondaryActionLoading}
                onClick={() => onSecondaryAction(close)}
              >
                {secondaryActionText}
              </Button>
            )}
          </Wrapper>
        </Wrapper>
      )}
    </HandleClickOutside>
  );
});

function Modal({
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
              backgroundColor(createAlphaColor("gray-blue/10", 180)),
            ]}
          >
            <ModalContent
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
          </Wrapper>,
          root,
        )}
    </>
  );
}

export default React.memo(observer(Modal));
