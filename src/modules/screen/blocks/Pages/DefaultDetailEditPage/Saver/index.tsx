import React from "react";
import { duration200, duration4000Number } from "layout/durations";

import Wrapper from "primitives/Wrapper";
import Icon from "primitives/Icon";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  flex,
  fullHeight,
  jc,
  marginLeft,
  marginRight,
  opacity,
  overflow,
  transition,
  width,
} from "libs/styles";

interface SaverInterface {
  saveDisabled: boolean;
  savedSuccessfully: boolean;
  saveLoading: boolean;
  onDiscard: () => void;
  onApply?: () => void;
  onSave?: () => void;
}

function Saver({ saveLoading, savedSuccessfully, onDiscard, saveDisabled, onApply, onSave }: SaverInterface) {
  const [successfulMessageVisible, setSuccessfulMessageVisible] = React.useState(() => savedSuccessfully);

  React.useEffect(() => {
    if (!savedSuccessfully) return;
    setSuccessfulMessageVisible(savedSuccessfully);
    const timer = setTimeout(() => setSuccessfulMessageVisible(false), duration4000Number);
    return () => clearTimeout(timer);
  }, [savedSuccessfully]);

  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
      {savedSuccessfully && (
        <Wrapper styles={[flex, fullHeight, ai(Aligns.CENTER), jc(Aligns.END), marginRight(10)]}>
          <Icon icon="cloud-check" width={20} height={16} color="gray-blue/05" />
          <Typography
            type="caption-semi-bold"
            color="gray-blue/05"
            noWrap
            styles={[
              marginLeft(8),
              transition(`all ${duration200}`),
              width(successfulMessageVisible ? "137px" : "0"),
              opacity(successfulMessageVisible ? 1 : 0),
              overflow("hidden"),
            ]}
          >
            Изменения сохранены
          </Typography>
        </Wrapper>
      )}
      {onDiscard && (
        <Button
          type={ButtonType.SECONDARY}
          size={ButtonSize.MEDIUM}
          styles={marginLeft(16)}
          onClick={() => onDiscard()}
        >
          Отменить
        </Button>
      )}
      <Button
        loading={saveLoading}
        loadingOnLeftSide
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
        loading={saveLoading}
        loadingOnLeftSide
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
