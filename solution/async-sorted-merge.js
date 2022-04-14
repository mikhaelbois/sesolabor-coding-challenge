"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    const numResults = logSources.length;

    // The idea here is to change how we interact with the data depending on the number of elements
    // Source: https://betterprogramming.pub/which-is-the-fastest-while-for-foreach-for-of-9022902be15e

    const logEntriesPromise = [];

    if (numResults > 10000) {
      let y = 0;
      while (y < numResults) {
        logEntriesPromise.push(logSources[y].popAsync());
        y++;
      }
    } else {
      for (const logSource of logSources) {
        logEntriesPromise.push(logSource.popAsync());
      }
    }

    Promise.all(logEntriesPromise).then(function(results) {
      results.sort(({ date: dateA }, { date: dateB }) => dateA - dateB);

      if (numResults > 10000) {
        let i = 0;
        while (i < numResults) {
          printer.print(results[i]);
          i++;
        }
      } else {
        for (const logEntry of results) {
          printer.print(logEntry);
        }
      }

      printer.done();
    });

    resolve(console.log("Async sort complete."));
  });
};
