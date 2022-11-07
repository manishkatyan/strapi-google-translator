module.exports = [
  {
    method: "PUT",
    path: "/saveConfiguration",
    handler: "settingController.saveSetting",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/getConfiguration",
    handler: "settingController.getSetting",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/translate",
    handler: "translateController.translate",
    config: {
      // auth: true,
      policies: [],
    },
  },
];
