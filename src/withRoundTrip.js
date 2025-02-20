import { useChannel } from "@storybook/client-api";
import { EVENTS } from "./constants";
import parseTicketData from './helpers/parseTicketData'

// something to have a look at:
// https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storyfn

export const withRoundTrip = (storyFn) => {
  const clearData = () => {
    emit(EVENTS.RESULT, {
      overview: {},
      subtasks: {},
      data: {}
    });
  }

  const emit = useChannel({
    [EVENTS.REQUEST]: async ({ ticketId, isForSubtask }) => {
      let data = null
      if (ticketId) {
        const fetchedData = await fetch(`${process.env?.STORYBOOK_MIDDLEWARE_JIRA_ENDPOINT || '/api'}?ticketId=${ticketId}`)
        data = await fetchedData.json()
      }
      const parsedData = parseTicketData(data)
      emit(EVENTS.RESULT, {parsedData: parsedData, isForSubtask: isForSubtask})
    },
    [EVENTS.CLEAR]: clearData,
  });
  return storyFn();
};
