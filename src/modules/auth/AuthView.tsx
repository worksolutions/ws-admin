import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "typedi";
import { browserHistory } from "common";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Input, { InputSize } from "primitives/Input/Input";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import Hint, { HintType } from "primitives/Popper/Hint";
import Password from "primitives/Input/Password";
import Form from "primitives/Form";

import { RequestError } from "libs/request";
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

import { useActions } from "modules/context/actions/useActions";
import { useAppContext } from "modules/context/hooks/useAppContext";

import globalEventBus from "../globalEventBus";

import { AuthTokenSaver } from "./authTokenSaver";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function AuthView({ reloadProfile }: { reloadProfile: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const appContext = useAppContext();

  const { userAuthenticate, mainReference } = systemState.stateContainer.state;
  const { authenticate } = useActions(userAuthenticate.actions, appContext);

  async function auth() {
    authenticate.loadingContainer.clearErrors();

    if (!email) authenticate.loadingContainer.setError("email", "Логин должен быть заполнен");
    if (!password) authenticate.loadingContainer.setError("password", "Пароль должен быть заполнен");

    if (!email || !password) return;

    try {
      const data = await authenticate.run({ email, password });
      if (userAuthenticate.authTokenSaveStrategy) {
        new AuthTokenSaver(userAuthenticate.authTokenSaveStrategy).runAuthenticationTokenPipeline(data);
      }
      await systemState.loadConfig();
      reloadProfile();
      browserHistory.replace(mainReference);
    } catch (e) {
      if (RequestError.isRequestError(e)) {
        authenticate.loadingContainer.setDefaultError(e.getMessage());
        return;
      }
      globalEventBus.emit("ADD_TOAST", { text: "Ошибка аутентификации" });
    }
  }

  const emailError = authenticate.loadingContainer.getError("email");
  const passwordError = authenticate.loadingContainer.getError("password");
  const defaultError = authenticate.loadingContainer.getDefaultError();

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
          <Form onSubmit={auth}>
            <Hint text={emailError} showOnHover={false} type={HintType.white}>
              {(initParent) => (
                <Input
                  ref={initParent}
                  outerStyles={[marginTop(32)]}
                  size={InputSize.LARGE}
                  value={email}
                  placeholder="Логин"
                  disabled={authenticate.loadingContainer.loading}
                  error={!!emailError}
                  onChange={setEmail}
                />
              )}
            </Hint>
            <Hint text={passwordError} showOnHover={false} type={HintType.white}>
              {(initParent) => (
                <Password
                  ref={initParent}
                  outerStyles={[marginTop(16)]}
                  size={InputSize.LARGE}
                  value={password}
                  placeholder="Пароль"
                  disabled={authenticate.loadingContainer.loading}
                  error={!!passwordError}
                  onChange={setPassword}
                />
              )}
            </Hint>
          </Form>

          <Hint text={defaultError} showOnHover={false} type={HintType.white}>
            {(initParent) => (
              <Button
                ref={initParent}
                styles={[marginTop(16)]}
                type={ButtonType.PRIMARY}
                loading={authenticate.loadingContainer.loading}
                size={ButtonSize.LARGE}
                onClick={auth}
              >
                Войти
              </Button>
            )}
          </Hint>
        </Wrapper>
        <Wrapper styles={[height(64), fullWidth, flex, ai(Aligns.CENTER), jc(Aligns.SPACE_BETWEEN)]}>
          <Wrapper styles={[flex, flexColumn]}>
            <Typography color="gray-blue/04">2020</Typography>
            <Typography color="gray-blue/04">© Work Solutions</Typography>
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
