import React, { Fragment } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button } from "@storybook/components";
import { List } from "./List";
import { useParameter } from '@storybook/api'

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent = ({ results, fetchData }) => {
  const value = useParameter('jira', null)
  if (value?.id) {

    fetch(`/api?ticketId=${value?.id}`)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
  }

  return (
    <TabsState
      initial="overview"
      backgroundColor={convert(themes.normal).background.hoverable}
    >
      <div
        id="overview"
        title="Overview"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder>
          <Fragment>
            {value?.id
              ? <p>Corresponding ticket:
                  <a href={`https://momkai.atlassian.net/rest/api/latest/issue/${value.id}`}>{value.id}</a>
                </p>
              : <p>
                  There's no tickets registered for this component.
                </p>  
            }
          </Fragment>
          <Fragment>
            <RequestDataButton
              secondary
              small
              onClick={fetchData}
              style={{ marginRight: 16 }}
            >
              Fetch details
            </RequestDataButton>
          </Fragment>
        </Placeholder>
      </div>
      <div
        id="toDo"
        title={`${results.toDo.length} To do`}
      >
        <List items={results.toDo} />
      </div>
      <div
        id="inProgress"
        title={`${results.inProgress.length} In progress`}
      >
        <List items={results.inProgress} />
      </div>
      <div
        id="readyForTest"
        title={`${results.readyForTest.length} Ready for test`}
      >
        <List items={results.readyForTest} />
      </div>
      <div
        id="done"
        title={`${results.done.length} Done`}
      >
        <List items={results.done} />
      </div>
    </TabsState>
)
}
