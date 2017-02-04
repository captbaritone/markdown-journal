import { formatTimestamp } from "./utils";
import { map, sortBy, reverse } from "lodash";

export const getJournalAsArray = state => {
  return state.journal && reverse(sortBy(map(state.journal), "date"));
};

const primaryHeading = str => {
  return `# ${str}`;
};
const secondaryHeading = str => {
  return `## ${str}`;
};
export const getMarkdown = state => {
  return getJournalAsArray(state).reduce((acc, entry) => {
    return [
      ...acc,
      secondaryHeading(new Date(entry.date).toISOString()),
      entry.markdown
    ];
  }, [ primaryHeading("My Journal") ]).join("\n\n");
};