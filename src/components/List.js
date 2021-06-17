import React, { Fragment, useState } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { Icons } from "@storybook/components";

const ListWrapper = styled.ul({
  listStyle: "none",
  fontSize: 14,
  padding: 0,
  margin: 0,
});

const Wrapper = styled.div({
  display: "flex",
  width: "100%",
  borderBottom: `1px solid ${convert(themes.normal).appBorderColor}`,
  "&:hover": {
    background: convert(themes.normal).background.hoverable,
  },
});

const Icon = styled(Icons)({
  height: 10,
  width: 10,
  minWidth: 10,
  color: convert(themes.normal).color.mediumdark,
  marginRight: 10,
  transition: "transform 0.1s ease-in-out",
  alignSelf: "center",
  display: "inline-flex",
});

const HeaderBar = styled.div({
  padding: convert(themes.normal).layoutMargin,
  paddingLeft: convert(themes.normal).layoutMargin - 3,
  background: "none",
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  width: "100%",

  "&:focus": {
    outline: "0 none",
    borderLeft: `3px solid ${convert(themes.normal).color.secondary}`,
  },
});

const Description = styled.div({
  padding: convert(themes.normal).layoutMargin,
  marginBottom: convert(themes.normal).layoutMargin,
  fontStyle: "italic",
});

const Link = styled.a({
  marginLeft: convert(themes.normal).layoutMargin
})

export const ListItem = ({ tabSubtask }) => {
  const [open, onToggle] = useState(false);

  return (
    <Fragment>
      <Wrapper>
        <HeaderBar onClick={() => onToggle(!open)} role="button">
          <Icon
            icon="chevrondown"
            size={10}
            color={convert(themes.normal).appBorderColor}
            style={{
              transform: `rotate(${open ? 0 : -90}deg)`,
            }}
          />
          {tabSubtask.id}
          <Link href={`${process.env.STORYBOOK_JIRA_BASE_URL}/${tabSubtask.id}`} target="_blank">
            <Icon
              icon="link"
              size={10}
              color={convert(themes.normal).appBorderColor}
            />
          </Link>
        </HeaderBar>
      </Wrapper>
      {open ? <Description>{tabSubtask.summary}</Description> : null}
    </Fragment>
  );
};

const List = ({ tabSubtasks }) => (
  <ListWrapper>
    {tabSubtasks.map((tabSubtask, id) => (
      <ListItem key={id} tabSubtask={tabSubtask}></ListItem>
    ))}
  </ListWrapper>
);

export default List