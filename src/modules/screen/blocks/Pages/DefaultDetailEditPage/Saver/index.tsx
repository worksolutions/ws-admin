import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { ai, Aligns, flex, marginLeft } from "libs/styles";

interface SaverInterface {
  saveDisabled: boolean;
  onDiscard: () => void;
  onApply?: () => void;
  onSave?: () => void;
}

function Saver({ onDiscard, saveDisabled, onApply, onSave }: SaverInterface) {
  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
      <Button type={ButtonType.SECONDARY} size={ButtonSize.MEDIUM} styles={marginLeft(16)} onClick={onDiscard}>
        Отменить
      </Button>
      <Button
        iconLeft="check"
        type={ButtonType.SECONDARY}
        size={ButtonSize.MEDIUM}
        styles={marginLeft(16)}
        disabled={saveDisabled}
        onClick={onApply}
      >
        Применить
      </Button>
      <Button
        iconLeft="save-outline"
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
