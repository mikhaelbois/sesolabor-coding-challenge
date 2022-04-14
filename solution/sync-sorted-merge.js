"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const numResults = logSources.length;

  // The idea here is to change how we interact with the data depending on the number of elements
  // Source: https://betterprogramming.pub/which-is-the-fastest-while-for-foreach-for-of-9022902be15e

  const logEntries = [];

  if (numResults > 10000) {
    let y = 0;
    while (y < numResults) {
      logEntries.push(logSources[y].pop());
      y++;
    }
  } else {
    for (const logSource of logSources) {
      logEntries.push(logSource.pop());
    }
  }

  logEntries.sort(({ date: dateA }, { date: dateB }) => dateA - dateB);

  if (numResults > 10000) {
    let i = 0;
    while (i < numResults) {
      printer.print(logEntries[i]);
      i++;
    }
  } else {
    for (const logEntry of logEntries) {
      printer.print(logEntry);
    }
  }

  printer.done();

  return console.log("Sync sort complete.");
};
