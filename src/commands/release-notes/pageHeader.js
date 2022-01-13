const weightStartNum = 9999999999999;
function pageHeader(readerVersion) {
  const todaysDate = new Date();
  const formattedDate = `${todaysDate.getMonth() + 1}-${todaysDate.getDate()}-${todaysDate.getFullYear()}`;
  return `---
title: "Release Notes ${formattedDate} [${readerVersion}]"
date: ${todaysDate.toISOString()}
weight: ${weightStartNum - todaysDate.getTime()}
---
`;
}

module.exports = pageHeader;
