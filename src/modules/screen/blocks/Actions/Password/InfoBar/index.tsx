import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import ProgressBar from "primitives/ProgressBar";

import { backgroundColor, Colors, fullWidth, height, marginBottom, marginTop, zIndex } from "libs/styles";
import { emptyBoxShadow } from "libs/styles/cleaner";

import { mediumSchema, strongSchema, weakSchema } from "./schemas";

interface InfoBarInterface {
  password: string;
}

const validationPipe = [strongSchema, mediumSchema, weakSchema];

interface ComponentConfigInterface {
  text: string;
  progressColor: Colors;
  textColor: Colors;
  emptyProgressValue?: boolean;
}

const emptyComponentConfig: ComponentConfigInterface = {
  text: "Введите пароль",
  progressColor: "black",
  textColor: "gray-blue/07",
  emptyProgressValue: true,
};

const componentConfigByStrength: ComponentConfigInterface[] = [
  {
    text: "Надежный пароль",
    progressColor: "green/05",
    textColor: "green/07",
  },
  {
    text: "Ненадежный пароль",
    progressColor: "orange/05",
    textColor: "orange/05",
  },
  {
    text: "Слишком короткий пароль",
    progressColor: "red/05",
    textColor: "red/07",
  },
];

function getStrength(password: string) {
  const index = validationPipe.findIndex((schema) => schema.validate(password));
  if (index === -1) return emptyComponentConfig;
  return componentConfigByStrength[index];
}

const progressBarStyles = [marginBottom(2), emptyBoxShadow, backgroundColor("gray-blue/02"), height(4)];

function InfoBar({ password }: InfoBarInterface) {
  const strength = React.useMemo(() => getStrength(password), [password]);

  return (
    <Wrapper styles={[fullWidth, marginTop(4)]}>
      {strength.emptyProgressValue ? (
        <ProgressBar value={0} styles={progressBarStyles} />
      ) : (
        <ProgressBar
          value={Math.min(password.length, 9) / 9}
          styles={progressBarStyles}
          barStyles={[zIndex(1), backgroundColor(strength.progressColor)]}
        />
      )}

      <Typography color={strength.textColor} type="caption-regular">
        {strength.text}
      </Typography>
    </Wrapper>
  );
}

export default React.memo(InfoBar);
