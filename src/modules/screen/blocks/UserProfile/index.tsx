import React from "react";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import Avatar from "components/Avatar";

import { ai, Aligns, border, borderRadius, flex, jc, marginRight, verticalPadding } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import FieldsList from "../RowFields/FieldsList";
import { FieldListItemType } from "../RowFields/FieldsList/types";

import { BlockInterface } from "state/globalState";

function UserProfile({ dataSource }: BlockInterface<{ value: string }>) {
  const { data, loadingContainer } = useDataSource<{ avatarReference: string; name: string; email: string }>(
    dataSource!,
  );

  if (loadingContainer.loading) return <Spinner />;
  if (!data) return null;

  return (
    <>
      <Wrapper styles={[verticalPadding(24), borderRadius(8), border(1, "gray-blue/02"), flex, jc(Aligns.CENTER)]}>
        <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
          <Avatar size={128} styles={marginRight(32)} reference={data.avatarReference} />
          <Wrapper>
            <Typography type="h2-bold">{data.name}</Typography>
            <FieldsList
              options={{ fields: [{ title: "E-mail", type: FieldListItemType.text, options: { value: data.email } }] }}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
}

export default React.memo(UserProfile);
