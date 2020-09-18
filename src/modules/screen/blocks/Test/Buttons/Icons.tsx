import React from "react";

import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";

export default function () {
  return (
    <>
      <Wrapper>
        <Button disabled size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.LARGE} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.LARGE}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.MEDIUM}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>
      <Wrapper>
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} />
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} iconLeft="alert" />
        <Button size={ButtonSize.SMALL} type={ButtonType.ICON} onClick={console.log} iconRight="alert" />
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.ICON}
          onClick={console.log}
          iconLeft="alert"
          iconRight="alert"
        />
      </Wrapper>
    </>
  );
}
