import React from "react";
import { observer } from "mobx-react-lite";

import Wrapper from "primitives/Wrapper";
import Spinner from "primitives/Spinner";
import { Icons } from "primitives/Icon";

import { ai, Aligns, flex, flexColumn, flexValue } from "libs/styles";

import { useDataSource } from "modules/context/dataSource/useDataSource";

import { SecondaryMenuDataSourceInterface } from "../SecondarySideMenu/types";

import Element from "./Element";
import { useBreadcrumbsWay } from "./hooks";

import { BlockInterface } from "state/systemState";

function CurrentScreenBreadcrumbs({ dataSource }: BlockInterface) {
  const { data } = useDataSource<SecondaryMenuDataSourceInterface>(dataSource!);
  const breadcrumbsWay = useBreadcrumbsWay(data?.items || []);
  if (!data) return <Spinner color="gray-blue/08" size={36} />;
  const lastBreadcrumbsWayIndex = breadcrumbsWay.length - 1;

  return (
    <Wrapper styles={[flex, ai(Aligns.STRETCH), flexValue(1)]}>
      TODO!
      <Element to="/" name="Главная" hasNext />
      <Element to={data.reference} name={data.title} hasNext={breadcrumbsWay.length !== 0} />
      {breadcrumbsWay.map(({ reference, name, icon }, index) => (
        <Element key={reference} to={reference} name={name} icon={icon} hasNext={index !== lastBreadcrumbsWayIndex} />
      ))}
    </Wrapper>
  );
}

export default React.memo(observer(CurrentScreenBreadcrumbs));
