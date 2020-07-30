import React from "react";
import { observer } from "mobx-react-lite";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { TypographyLink } from "primitives/Typography/TypographyLink";

import { ai, Aligns, flex, marginLeft } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useAppContext } from "modules/context/hooks/useAppContext";
import { insertContext } from "modules/context/insertContext";

import PageHeaderStatus, { PageHeaderStatusInterface } from "./Status";

import { ContainSlotsInterface } from "state/systemState";

export interface PageHeaderInterface {
  title: string;
  status?: PageHeaderStatusInterface;
  externalReference?: string;
}

function PageHeader({ slots, status, title, externalReference }: ContainSlotsInterface & PageHeaderInterface) {
  const appContext = useAppContext();

  const enhancedTitle = insertContext(title, appContext.context);
  const enhancedExternalReference = insertContext(externalReference, appContext.context);

  return (
    <>
      <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
        <Typography type="h1-bold">{enhancedTitle.value}</Typography>
        {enhancedExternalReference.value && (
          <TypographyLink styles={marginLeft(16)} to={enhancedExternalReference.value} target="_blank">
            <Button size={ButtonSize.MEDIUM} type={ButtonType.ICON} iconLeft="external-link-alt" />
          </TypographyLink>
        )}
        {status && <PageHeaderStatus styles={marginLeft(16)} title={status.title} badgeColor={status.badgeColor} />}
      </Wrapper>
      {slots.headingAction && <BlockRenderer {...slots.headingAction} />}
    </>
  );
}

export default React.memo(observer(PageHeader));
