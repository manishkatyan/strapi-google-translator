"use strict";
const _ = require("lodash");

module.exports = ({ strapi }) => ({
  async saveSetting(ctx) {
    const data = ctx.request.body;
    const response = await strapi
      .plugin("strapi-google-translator")
      .service("settingService")
      .saveSetting(data);

    return ctx.send({ ok: true, response });
  },

  async getSetting(ctx) {
    const response = await strapi
      .plugin("strapi-google-translator")
      .service("settingService")
      .getSetting();

    return ctx.send({ ok: true, response });
  },
});
