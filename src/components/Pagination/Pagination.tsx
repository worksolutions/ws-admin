import React from "react";
import { observer } from "mobx-react-lite";
import ReactPagination from "rc-pagination";
import styled from "styled-components";
import { clamp, repeat } from "ramda";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Button, { ButtonSize, ButtonType } from "primitives/Button";
import { InputSize } from "primitives/Input/Input";
import { ghostActive } from "primitives/Button/styles/types/ghost";
import MaskedInput, { makeMask } from "primitives/Input/MaskedInput";
import Form from "primitives/Form";

import {
  ai,
  Aligns,
  disableOutline,
  flex,
  horizontalPadding,
  marginLeft,
  marginRight,
  pointerEvents,
  textAlign,
  width,
} from "libs/styles";
import stopPropagation from "libs/stopPropagation";
import { useEffectSkipFirst } from "libs/hooks";

import { calculatePaginationData, getMaskedInputWidth } from "./libs";

interface PaginationInterface {
  styles?: any;
  elementsCount: number;
  page: number;
  perPage: number;
  onChange: (page: number) => void;
}

const StyledReactPagination = styled(ReactPagination)`
  ${flex};
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    ${disableOutline};
  }
`;

const paginationComponentsForType: Record<
  string,
  (props: { currentPage: number; renderValue: number; pagesCount: number }) => JSX.Element
> = {
  "jump-prev": () => (
    <Typography onClick={stopPropagation()} styles={[horizontalPadding(2)]} type="button" color="gray-blue/03">
      ...
    </Typography>
  ),
  page: (props) => (
    <Button
      styles={[
        marginRight(2),
        marginLeft(2),
        props.currentPage === props.renderValue && [ghostActive, pointerEvents("none")],
      ]}
      size={ButtonSize.SMALL}
      type={ButtonType.GHOST}
      onClick={() => null}
    >
      {props.renderValue}
    </Button>
  ),
  prev: (props) => (
    <Button
      styles={[marginRight(6)]}
      type={ButtonType.ICON}
      size={ButtonSize.SMALL}
      iconLeft="arrow-left"
      disabled={props.currentPage === 1}
      onClick={() => null}
    />
  ),
  next: (props) => (
    <Button
      styles={[marginLeft(6)]}
      type={ButtonType.ICON}
      size={ButtonSize.SMALL}
      iconLeft="arrow-right"
      disabled={props.currentPage === props.pagesCount}
      onClick={() => null}
    />
  ),
};

paginationComponentsForType["jump-next"] = paginationComponentsForType["jump-prev"];

function Pagination({ styles, page, perPage, elementsCount, onChange }: PaginationInterface) {
  const [goToPage, setGoToPage] = React.useState("");
  const maskedInputRef = React.useRef<HTMLInputElement>(null);

  useEffectSkipFirst(() => onChange(1), [perPage]);

  const { lastElementNumberOnPage, firstElementNumberOnPage, pages } = React.useMemo(
    () => calculatePaginationData(page, perPage, elementsCount),
    [page, perPage, elementsCount],
  );

  const mask = React.useMemo(() => makeMask(repeat(/\d/, pages.toString().length)), [pages]);

  const onSubmit = () => {
    const newPage = goToPage ? clamp(1, pages, parseFloat(goToPage)) || 1 : "";
    if (newPage === "") return;
    onChange(parseFloat(newPage.toString()));
    setGoToPage("");
    maskedInputRef.current!.blur();
  };

  return (
    <Wrapper styles={[flex, ai(Aligns.CENTER), styles]}>
      <Typography color="gray-blue/05" styles={marginRight(16)}>
        {firstElementNumberOnPage}-{lastElementNumberOnPage} из {elementsCount}
      </Typography>
      <StyledReactPagination
        showLessItems
        current={page}
        total={elementsCount}
        pageSize={perPage}
        itemRender={(pageNumber, name) => {
          const Component = paginationComponentsForType[name];
          if (!Component) return null;
          return <Component renderValue={pageNumber} currentPage={page} pagesCount={pages} />;
        }}
        onChange={(newPage) => {
          onChange(newPage);
          setGoToPage("");
        }}
      />
      <Typography color="gray-blue/05" styles={marginLeft(20)}>
        Перейти на:
      </Typography>
      <Form onSubmit={onSubmit}>
        <MaskedInput
          ref={maskedInputRef}
          size={InputSize.MEDIUM}
          mask={mask}
          outerStyles={[marginLeft(8), width(getMaskedInputWidth(pages))]}
          styles={[textAlign("center")]}
          value={goToPage}
          placeholder="1"
          onChange={setGoToPage}
        />
      </Form>
    </Wrapper>
  );
}

export default React.memo(observer(Pagination));
