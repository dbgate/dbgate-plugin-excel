const xlsx = require('xlsx');
const reader = require('./reader');
const writer = require('./writer');

module.exports = {
  packageName: 'dbgate-plugin-excel',
  shellApi: {
    reader,
    writer,
  },

  commands: {
    analyse: async ({ filePath }) => {
      const workbook = xlsx.readFile(filePath, { bookSheets: true });
      return workbook.SheetNames;
    },
  },
  initialize(dbgateEnv) {
    writer.initialize(dbgateEnv);
  },
};
