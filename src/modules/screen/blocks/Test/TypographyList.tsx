import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { Aligns, child, flex, flexColumn, jc, margin, marginBottom } from "libs/styles";

export default function () {
  return (
    <Wrapper styles={[flex, child([flex, flexColumn, margin(10), child(marginBottom(10))])]}>
      <Wrapper>
        <Typography type="h1-bold">H1 -- 28px-32px / Bold</Typography>
        <Typography type="h2-bold">H2 -- 20px-24px / Bold</Typography>
        <Typography type="h3-bold">H3 -- 16px-20px / Bold</Typography>
        <hr />
        <Typography type="body-regular">Body -- 14px-20px / Regular</Typography>
        <Typography type="body-semi-bold">Body -- 14px-20px / SemiBold</Typography>
        <Typography type="body-regular" color="blue/06">
          Body -- 14px-20px / Regular-Underline
        </Typography>
        <Typography type="body-semi-bold" color="blue/06">
          Body -- 14px-20px / SemiBold
        </Typography>
        <Typography type="body-regular">Body -- 14px-20px / Regular-Italic</Typography>
        <hr />
        {/*  <Typography>Body 2 -- 16px-20px / Regular</Typography>*/}
        {/*  <Typography>Body 2 -- 16px-20px / SemiBold</Typography>*/}
        {/*  <Typography>Body 2 -- 16px-20px / Regular-Underline</Typography>*/}
        {/*  <Typography>Body 2 -- 16px-20px / SemiBold</Typography>*/}
        {/*  <Typography>Body 2 -- 16px-20px / Regular-Italic</Typography>*/}
      </Wrapper>

      <Wrapper>
        <Typography type="caption-regular">Caption -- 12px-16px / Regular</Typography>
        <Typography type="caption-semi-bold">Caption -- 12px-16px / SemiBold</Typography>
        <Typography type="caption-regular" color="blue/06">
          Caption -- 12px-16px / Regular-Underline
        </Typography>
        <Typography type="caption-semi-bold" color="blue/06">
          Caption -- 12px-16px / SemiBold
        </Typography>
        <Typography type="caption-regular">Caption -- 12px-16px / Regular-Italic</Typography>
        <hr />
        <Typography type="overline-medium">Overline -- 10px-12px / Medium</Typography>
        <Typography type="overline-bold">Overline -- 10px-12px / Bold</Typography>
        <Typography type="overline-medium" color="blue/06">
          Overline -- 10px-12px / Medium-Underline
        </Typography>
        <Typography type="overline-bold" color="blue/06">
          Overline -- 10px-12px / Bold
        </Typography>
        <Typography type="overline-medium">Overline -- 10px-12px / Medium-Italic</Typography>
        <hr />
        <Typography type="button">Button -- 14px-24px / SemiBold</Typography>
      </Wrapper>
    </Wrapper>
  );
}
