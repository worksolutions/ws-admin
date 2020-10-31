import React from "react";
import { duration300 } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Icon from "primitives/Icon";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  flex,
  marginLeft,
  marginRight,
  overflow,
  position,
  transition,
  visibility,
  width,
  zIndex,
} from "libs/styles";
import { useMeasure } from "libs/hooks/useMeasure";

interface SaverInterface {
  saveCompleteOpened: boolean;
  saveCompleteShowed: boolean;
  saveDisabled: boolean;
  saveLoading: boolean;
  applyLoading: boolean;
  onDiscard: () => void;
  onApply?: () => void;
  onSave?: () => void;
}

function SaveTextIndicator({ show }: { show: boolean }) {
  const [ref, bounds] = useMeasure();

  return (
    <>
      <Wrapper styles={[marginLeft(4), marginRight(8)]}>
        <Typography
          type="caption-semi-bold"
          color="gray-blue/05"
          noWrap
          styles={[transition(`width ${duration300}`), width(show ? bounds.width : 0), overflow("hidden")]}
        >
          Изменения сохранены
        </Typography>
      </Wrapper>
      <Typography
        ref={ref}
        type="caption-semi-bold"
        noWrap
        styles={[visibility("hidden"), position("absolute"), zIndex(-10000)]}
      >
        Изменения сохранены
      </Typography>
    </>
  );
}

function Saver({
  saveCompleteOpened,
  saveCompleteShowed,
  saveLoading,
  applyLoading,
  saveDisabled,
  onApply,
  onSave,
  onDiscard,
}: SaverInterface) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
      {saveCompleteShowed && (
        <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
          <Icon color="gray-blue/05" icon="save-indicator" />
          <SaveTextIndicator show={saveCompleteOpened} />
        </Wrapper>
      )}
      {onDiscard && (
        <Button type={ButtonType.SECONDARY} size={ButtonSize.MEDIUM} styles={marginLeft(16)} onClick={onDiscard}>
          Отменить
        </Button>
      )}
      <div onClick={onApply}>
        <Button
          iconLeft="check"
          loadingLeft={applyLoading}
          type={ButtonType.SECONDARY}
          size={ButtonSize.MEDIUM}
          styles={marginLeft(16)}
          disabled={saveDisabled}
        >
          Применить
        </Button>
      </div>
      <Button
        iconLeft="save-outline"
        loadingLeft={saveLoading}
        size={ButtonSize.MEDIUM}
        styles={marginLeft(16)}
        disabled={saveDisabled}
        onClick={onSave}
      >
        Сохранить
      </Button>
    </Wrapper>
  );
}

export default React.memo(Saver);
