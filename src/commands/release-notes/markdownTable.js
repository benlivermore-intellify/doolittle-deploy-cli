function markdownTable(tableArray) {
  let mdTable = '';
  tableArray.forEach((row, index) => {
    mdTable += `|${row.join('|')}|\n`;
    if (index === 0) {
      mdTable += row.reduce((str, row) => {
        return str + '---|'
      }, '|');
      mdTable += '\n';
    }
  });
  return mdTable;
}

module.exports = markdownTable;
