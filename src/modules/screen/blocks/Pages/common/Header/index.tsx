import React from "react";
import { observer } from "mobx-react-lite";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import { ai, Aligns, flex, flexValue, marginLeft } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import Status, { StatusInterface } from "./Status";

import { ContainSlotsInterface } from "state/globalState";

export interface PageHeaderInterface {
  title: string;
  status?: StatusInterface;
  externalReference?: string;
  rightSideElement?: React.ReactNode;
}

function PageHeader({
  slots,
  status,
  title,
  externalReference,
  rightSideElement,
}: ContainSlotsInterface & PageHeaderInterface) {
  const appContext = useAppContext();

  const enhancedTitle = insertContext(title, appContext.context);
  const enhancedExternalReference = insertContext(externalReference, appContext.context);

  return (
    <>
      <Wrapper styles={[flex, ai(Aligns.CENTER), flexValue(1)]}>
        <Typography type="h1-bold">{enhancedTitle.value}</Typography>
        {enhancedExternalReference.value && (
          <TypographyLink styles={marginLeft(16)} to={enhancedExternalReference.value} target="_blank">
            <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} iconLeft="external-link-alt" />
          </TypographyLink>
        )}
        {status && <Status styles={marginLeft(16)} status={status} />}
      </Wrapper>
      <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
        {rightSideElement}
        {slots.headingAction && <BlockRenderer {...slots.headingAction} />}
      </Wrapper>
    </>
  );
}

export default React.memo(observer(PageHeader));
