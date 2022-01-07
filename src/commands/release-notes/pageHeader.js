function pageHeader(readerVersion, lastWeight) {
  const todaysDate = new Date();
  const formattedDate = `${todaysDate.getMonth() + 1}-${todaysDate.getDate()}-${todaysDate.getFullYear()}`;
  return `---
title: "Release Notes ${formattedDate} [${readerVersion}]"
date: ${todaysDate.toISOString()}
weight: ${lastWeight - 2}
---
`;
}

module.exports = pageHeader;
