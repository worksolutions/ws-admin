import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "typedi";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Input, { InputSize } from "primitives/Input";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Hint, { HintType } from "primitives/Popper/Hint";

import {
  ai,
  Aligns,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  borderRight,
  child,
  flex,
  flexColumn,
  flexShrink,
  flexValue,
  fullHeight,
  fullWidth,
  height,
  jc,
  marginRight,
  marginTop,
  padding,
  width,
} from "libs/styles";

import { useActions } from "../context/actions/useActions";
import { useAppContext } from "../context/hooks/useAppContext";
import { RequestError } from "../../libs/request";
import globalEventBus from "../globalEventBus";
import { browserHistory } from "../../common";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function AuthView() {
  const [email, setEmail] = React.useState(localStorage.getItem("login") as string);
  const [password, setPassword] = React.useState(localStorage.getItem("pass") as string);
  const appContext = useAppContext();

  const { userAuthenticate } = systemState.stateContainer.state;
  const { authenticate } = useActions(userAuthenticate.actions, appContext);

  async function auth() {
    authenticate.loadingContainer.clearErrors();

    if (!email) authenticate.loadingContainer.setError("email", "Логин должен быть заполнен");
    if (!password) authenticate.loadingContainer.setError("password", "Пароль должен быть заполнен");

    if (!email && !password) return;

    try {
      const data = await authenticate.run({ email, password });
      if (userAuthenticate.setTokenCookieFromFrontend) {
        systemState.setTokenCookieFromFrontend(userAuthenticate.setTokenCookieFromFrontend, data);
      }
      systemState.loadConfig();
      browserHistory.replace("/");
    } catch (e) {
      const requestError: RequestError = e;
      globalEventBus.emit("ADD_TOAST", { text: requestError.error.message });
    }
  }

  const emailError = authenticate.loadingContainer.getError("email");
  const passwordError = authenticate.loadingContainer.getError("password");

  React.useEffect(() => {
    if (!emailError) return;
    authenticate.loadingContainer.setError("email", null);
  }, [email]);

  React.useEffect(() => {
    if (!passwordError) return;
    authenticate.loadingContainer.setError("password", null);
  }, [password]);

  return (
    <Wrapper styles={[flex, fullHeight]}>
      <Wrapper
        styles={[
          width(344),
          padding("24px 32px"),
          flex,
          flexColumn,
          jc(Aligns.SPACE_BETWEEN),
          child(flexShrink(0)),
          borderRight(1, "gray-blue/02"),
        ]}
      >
        <Wrapper
          styles={[height(64), fullWidth, backgroundImage(userAuthenticate.topImage), backgroundRepeat("no-repeat")]}
        />
        <Wrapper styles={[flex, flexColumn]}>
          <Typography type="h1-bold">{userAuthenticate.title}</Typography>
          <Typography type="body-semi-bold">Административная панель</Typography>
          <Hint text={emailError} showOnHover={false} type={HintType.white}>
            {(initParent) => (
              <Input
                ref={initParent}
                outerStyles={[marginTop(32)]}
                size={InputSize.LARGE}
                value={email}
                placeholder="Логин"
                error={!!emailError}
                onChange={setEmail}
              />
            )}
          </Hint>
          <Hint text={passwordError} showOnHover={false} type={HintType.white}>
            {(initParent) => (
              <Input
                ref={initParent}
                outerStyles={[marginTop(16)]}
                size={InputSize.LARGE}
                value={password}
                placeholder="Пароль"
                error={!!passwordError}
                onChange={setPassword}
              />
            )}
          </Hint>
          <Button
            styles={[marginTop(16)]}
            type={ButtonType.PRIMARY}
            loading={authenticate.loadingContainer.loading}
            size={ButtonSize.LARGE}
            onClick={auth}
          >
            Войти
          </Button>
        </Wrapper>
        <Wrapper styles={[height(64), fullWidth, flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN)]}>
          <Wrapper styles={[flex, flexColumn]}>
            <Typography color="gray-blue/04">© Рабочие решения</Typography>
            <Typography color="gray-blue/04">2020</Typography>
          </Wrapper>
          <Wrapper
            styles={[
              backgroundImage("/ws-logo-mono-black.svg"),
              backgroundRepeat("no-repeat"),
              width(66),
              height(48),
              marginRight(8),
            ]}
          />
        </Wrapper>
      </Wrapper>
      <Wrapper
        styles={[
          flexValue(1),
          fullHeight,
          backgroundImage(userAuthenticate.rightImage),
          backgroundRepeat("no-repeat"),
          backgroundPosition("right center"),
        ]}
      />
    </Wrapper>
  );
}

export default React.memo(observer(AuthView));
