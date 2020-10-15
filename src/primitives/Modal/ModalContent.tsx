import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { isNil, last } from "ramda";
import { elevation32 } from "style/shadows";

import Typography from "primitives/Typography";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import HandleClickOutside from "primitives/HandleClickOutside";
import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  border,
  borderRadius,
  child,
  display,
  firstChild,
  flex,
  flexColumn,
  fullWidth,
  horizontalPadding,
  jc,
  marginLeft,
  marginTop,
  maxWidth,
  padding,
  verticalAlign,
  verticalPadding,
  width,
} from "libs/styles";

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

export interface ModalInterface {
  size?: ModalSize;
  opened?: boolean;
  wrappedContent?: (open: () => void) => React.ReactNode;
  primaryActionText?: string;
  secondaryActionText?: string;
  primaryActionLoading?: boolean;
  secondaryActionLoading?: boolean;
  actionsInColumn?: boolean;
  title: string;
  subTitle?: string;
  closeOnBackdropClick?: boolean;
  actionBlock?: React.ReactNode;
  children?: () => React.ReactNode;
  onPrimaryAction?: (close: () => void) => void;
  onSecondaryAction?: (close: () => void) => void;
  onClose?: () => void;
}

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

export const activeModal = new ActiveModal();
export const ModalContent = observer(function ({
  actionBlock,
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
}: Required<Pick<ModalInterface, "size" | "title">> &
  Pick<
    ModalInterface,
    | "actionBlock"
    | "subTitle"
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
            display("inline-block"),
            verticalAlign("middle"),
            maxWidth(`calc(100% - 80px)`),
            width(modalWidthBySize[size]),
            border(1, "gray-blue/02"),
            backgroundColor("white"),
            elevation32,
            borderRadius(8),
          ]}
        >
          <Wrapper
            styles={[
              fullWidth,
              flex,
              ai(Aligns.CENTER),
              jc(Aligns.SPACE_BETWEEN),
              padding(`16px ${modalHorizontalPadding}px 0 ${modalHorizontalPadding}px`),
            ]}
          >
            <Typography type="h2-bold">{title}</Typography>
            <Button size={ButtonSize.SMALL} type={ButtonType.ICON} iconLeft="cross-big" onClick={close} />
          </Wrapper>
          {subTitle && (
            <Typography
              color="gray-blue/06"
              styles={[fullWidth, padding(`8px ${modalHorizontalPadding}px 24px ${modalHorizontalPadding}px`)]}
            >
              {subTitle}
            </Typography>
          )}
          <Wrapper styles={horizontalPadding(modalHorizontalPadding)}>{children}</Wrapper>
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
            {actionBlock}
          </Wrapper>
        </Wrapper>
      )}
    </HandleClickOutside>
  );
});
