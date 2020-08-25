import React from "react";

import ImageWithDefault from "primitives/ImageWithDefault";
import Icon from "primitives/Icon";
import { TypographyLink } from "primitives/Typography/TypographyLink";
import Wrapper from "primitives/Wrapper";

import { ai, Aligns, border, borderRadius, flex, marginRight } from "libs/styles";

import SimpleText from "modules/screen/blocks/SimpleText";
import { insertContext } from "modules/context/insertContext";
import { useAppContext } from "modules/context/hooks/useAppContext";
import BlockRenderer from "modules/screen/BlockRenderer";

import { FieldListItemType } from "../types";

interface FieldItemElementRendererInterface {
  styles?: any;
  options: Record<string, any>;
  type: FieldListItemType;
}

const matchesFieldItemAndType: Record<FieldListItemType, (props: { options: any; styles?: any }) => JSX.Element> = {
  [FieldListItemType.text]: ({ options, styles }) => <SimpleText styles={styles} options={options} />,
  [FieldListItemType.image]: ({ options, styles }) => {
    const reference = insertContext(options.reference, useAppContext().context);
    return (
      <ImageWithDefault
        styles={[styles, borderRadius(6), border(1, "gray-blue/02")]}
        src={reference.value}
        width="100%"
        aspectRatio={options.aspectRatio}
      />
    );
  },
  [FieldListItemType.iconLink]: ({ options, styles }) => {
    const imageReference = insertContext(options.imageReference, useAppContext().context);
    const reference = insertContext(options.reference, useAppContext().context);
    const title = insertContext(options.title, useAppContext().context);

    return (
      <Wrapper styles={[styles, flex, ai(Aligns.CENTER)]}>
        {imageReference.value && <Icon icon={imageReference.value} styles={[marginRight(8), borderRadius(12)]} />}
        <TypographyLink to={reference.value}>{title.value}</TypographyLink>
      </Wrapper>
    );
  },
  [FieldListItemType.link]: ({ options, styles }) => {
    const reference = insertContext(options.reference, useAppContext().context);
    const title = insertContext(options.title, useAppContext().context);

    return (
      <Wrapper styles={[styles, flex, ai(Aligns.CENTER)]}>
        <TypographyLink to={reference.value}>{title.value}</TypographyLink>
      </Wrapper>
    );
  },
  "edit:RadioGroup": ({ options: { actions, dataSource, radioGroupOptions }, styles }) => (
    <BlockRenderer
      type="Actions/RadioGroup"
      styles={styles}
      dataSource={dataSource}
      actions={actions}
      options={radioGroupOptions}
    />
  ),
  "edit:Date": ({ options: { dateOptions, actions }, styles }) => (
    <BlockRenderer type="Actions/Date" styles={styles} actions={actions} options={dateOptions} />
  ),
  "edit:Text": ({ options: { inputOptions, actions }, styles }) => (
    <BlockRenderer type="Actions/Input" styles={styles} actions={actions} options={inputOptions} />
  ),
  "edit:Dropdown": ({ options: { dropdownOptions, dataSource, actions }, styles }) => (
    <BlockRenderer
      type="Actions/Dropdown"
      styles={styles}
      actions={actions}
      options={dropdownOptions}
      dataSource={dataSource}
    />
  ),
};

function FieldItemElementRenderer({ options, styles, type }: FieldItemElementRendererInterface) {
  if (!type) return null;
  const Component = matchesFieldItemAndType[type];
  return <Component options={options} styles={styles} />;
}

export default React.memo(FieldItemElementRenderer);
