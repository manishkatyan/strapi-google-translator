"use strict";

module.exports = async ({ strapi }) => {
  // bootstrap phase
  const resultCollection = await strapi.api;

  const content = await strapi
    .plugin("strapi-google-translator")
    .service("settingService")
    .getContentTypes(resultCollection, "contentType");

  const resultComponent = await strapi.components;

  const component = await strapi
    .plugin("strapi-google-translator")
    .service("settingService")
    .getContentTypes(resultComponent, "component");

  const data = {
    contentType: content,
    componentType: component,
  };

  await strapi
    .plugin("strapi-google-translator")
    .service("settingService")
    .saveSetting(data);
};
