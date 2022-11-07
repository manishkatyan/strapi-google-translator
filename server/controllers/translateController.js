"use strict";

module.exports = ({ strapi }) => ({
  async translate(ctx) {
    try {
      const { langs, sourceData, collectionTypeSlug } = ctx.request.body;
      const { authorization } = ctx.headers;

      const { collectionName, __schema__ } =
        strapi.contentTypes[collectionTypeSlug];

      const token = this.getToken(authorization);

      const dataToTranslate = await strapi
        .plugin("strapi-google-translator")
        .service("translateService")
        .getTranslatableData(sourceData);

      const response = await strapi
        .plugin("strapi-google-translator")
        .service("translateService")
        .translate(
          langs,
          sourceData.localizations,
          collectionTypeSlug,
          dataToTranslate,
          sourceData.locale,
          collectionName,
          sourceData.id,
          token
        );

      return response;
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  },
  getToken(auth) {
    return auth.split("Bearer ")[1];
  },
});
