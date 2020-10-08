import React from "react";
import { observer } from "mobx-react-lite";
import { append } from "ramda";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import Typography from "primitives/Typography";

import Avatar from "components/Avatar";

import { ai, Aligns, border, borderRadius, flex, jc, marginRight, verticalPadding } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";
import FieldsList from "modules/screen/blocks/RowFields/FieldsList";
import {
  FieldListItemInterface,
  FieldListItemType,
  FieldListItemMode,
} from "modules/screen/blocks/RowFields/FieldsList/types";

import { BlockInterface, UserInterface } from "state/globalState";

function UserProfile({
  dataSource,
  options,
}: BlockInterface<{ value: string; fieldsListItemWithPlaceholder?: boolean }>) {
  const { data, loadingContainer } = useDataSource<UserInterface>(dataSource!);

  if (loadingContainer.loading) return <Spinner />;
  if (!data) return null;

  const customFields: FieldListItemInterface[] =
    data.customFields?.map(({ title, options, type }) => ({
      title,
      type,
      options,
    })) || [];

  return (
    <>
      <Wrapper styles={[verticalPadding(24), borderRadius(8), border(1, "gray-blue/02"), flex, jc(Aligns.CENTER)]}>
        <Wrapper styles={[flex, ai(Aligns.CENTER)]}>
          <Avatar size={128} styles={marginRight(32)} reference={data.avatar} />
          <Wrapper>
            <Typography type="h2-bold">{data.name}</Typography>
            <FieldsList
              useTitleWidthCalculation={false}
              options={{
                mode: FieldListItemMode.VERTICAL,
                fields: [
                  ...append(
                    {
                      title: "E-mail",
                      type: FieldListItemType.link,
                      options: { title: data.email, reference: `mailto:${data.email}` },
                    },
                    customFields,
                  ).map(({ title, ...fields }) => ({
                    ...fields,
                    title: options?.fieldsListItemWithPlaceholder ? title : undefined,
                  })),
                ],
              }}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
}

export default React.memo(observer(UserProfile));
