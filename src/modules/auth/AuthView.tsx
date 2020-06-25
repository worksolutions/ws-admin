import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "typedi";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Input from "primitives/Input";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

import { flex } from "libs/styles";

import { useActions } from "../context/actions/useActions";
import { useAppContext } from "../context/hooks/useAppContext";

import { SystemState } from "state/systemState";

const systemState = Container.get(SystemState);

function AuthView() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const state = systemState.stateContainer.state;
  const appContext = useAppContext();
  const actions = useActions(state.user.actions, appContext);

  // const { data, loadingContainer } = useDataSource<GlobalStateCommonPartInterface>({
  //   type: DataSourceType.CONTEXT,
  //   options: {
  //     key: "{{currentUser}}",
  //   },
  // });

  function authenticate() {
    actions.resetPassword
      .run({
        email,
        password,
      })
      .catch(console.log);
  }

  return (
    <Wrapper styles={[flex]}>
      <Typography>Авторизация</Typography>
      <Input value={email} onChange={setEmail} placeholder="email" />
      <Input value={password} onChange={setPassword} placeholder="password" />
      <Button type={ButtonType.PRIMARY} size={ButtonSize.LARGE} onClick={authenticate}>
        Войти
      </Button>
    </Wrapper>
  );
}

export default React.memo(observer(AuthView));
