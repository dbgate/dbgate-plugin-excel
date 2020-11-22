let axios;

function initialize(dbgateEnv) {
  axios = dbgateEnv.axios;
}

const excelFormat = {
  storageType: 'excel',
  extension: 'xlsx',
  name: 'MS Excel',
  readerFunc: 'excelSheetReader@dbgate-plugin-excel',
  writerFunc: 'excelSheetWriter@dbgate-plugin-excel',

  addFilesToSourceList: async (file, newSources, newValues) => {
    const resp = await axios.post('plugins/command', {
      command: 'analyse',
      packageName: 'dbgate-plugin-excel',
      args: {
        filePath: file.full,
      },
    });
    const sheetNames = resp.data;
    for (const sheetName of sheetNames) {
      newSources.push(sheetName);
      newValues[`sourceFile_${sheetName}`] = {
        fileName: file.full,
        sheetName,
      };
    }
  },

  args: [
    {
      type: 'checkbox',
      name: 'singleFile',
      label: 'Create single file',
      direction: 'target',
    },
  ],

  getDefaultOutputName: (sourceName, values) => {
    if (values.target_excel_singleFile) {
      return sourceName;
    }
    return null;
  },

  getOutputParams: (sourceName, values) => {
    if (values.target_excel_singleFile) {
      return {
        sheetName: values[`targetName_${sourceName}`] || sourceName,
        fileName: 'data.xlsx',
      };
    }
    return null;
  },
};

export default {
  fileFormats: [excelFormat],
  initialize,
};
