const xlsx = require('xlsx');
const excelSheetWriter = require('./excelSheetWriter');
const excelSheetReader = require('./excelSheetReader');

module.exports = {
  shellApi: {
    excelSheetWriter,
    excelSheetReader,
  },
  commands: {
    analyse: async ({ filePath }) => {
      const workbook = xlsx.readFile(filePath, { bookSheets: true });
      return workbook.SheetNames;
    },
  },
  packageName: 'dbgate-plugin-excel',
  initialize(dbgateEnv) {
    excelSheetWriter.initialize(dbgateEnv);
  },
};
