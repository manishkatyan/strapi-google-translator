"use strict";

const _ = require("lodash");
const axiosInstance = require("axios");
const { ApplicationError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => ({
  async getTranslatableData(sourceData) {
    const translatableData = _.omit(sourceData, [
      "id",
      "createdAt",
      "createdBy",
      "publishedAt",
      "updatedAt",
      "updatedBy",
      "locale",
      "localizations",
      "__temp_key__",
    ]);

    return translatableData;
  },

  async translate(
    langs,
    localizations,
    collectionTypeSlug,
    dataToTranslate,
    sourceLocale,
    collectionName,
    sourceDataId,
    token
  ) {
    try {
      const setting = await this.initialize();

      const { strapiSetting } = setting;

      for (let language of langs) {
        //translateData Service

        const translatedFields = await this.doTranslation(
          dataToTranslate,
          sourceLocale,
          language,
          collectionName,
          token
        );

        if (_.isEmpty(translatedFields)) {
          throw new ApplicationError("Unable to translate");
        }

        // checking for localization exists

        const isLocalization = localizations.filter(
          (locale) => locale.locale === language
        );

        const saved =
          isLocalization.length > 0
            ? await this.updateTranslation(
                strapiSetting.backendUrl,
                collectionTypeSlug,
                isLocalization[0].id,
                translatedFields,
                token,
                language
              )
            : await this.saveTranslation(
                strapiSetting.backendUrl,
                collectionTypeSlug,
                sourceDataId,
                translatedFields,
                strapiSetting.apiToken
              );

        if (!saved) {
          throw new ApplicationError("Unable to save translation");
        }
      }
      return {
        status: 200,
        created: true,
        message: "Translated SuccessFully!",
      };
    } catch (error) {
      console.error(error);
      throw { satus: 500, message: error };
    }
  },

  async initialize() {
    const strapiSetting = await strapi.config.get(
      "plugin.strapi-google-translate"
    );

    const translatorSetting = await strapi
      .plugin("strapi-google-translate")
      .service("settingService")
      .getSetting();

    // if (!translatorSetting.apiKey)
    //   throw new ApplicationError(
    //     `Deepl api key is required. please configure in translator setting page : ${error.message} `
    //   );

    return { translatorSetting, strapiSetting };
  },

  async doTranslation(
    dataToTranslate,
    sourceLocale,
    targetLocale,
    collectionName,
    token
  ) {
    try {
      const translatedData = {};

      for (let fieldName in dataToTranslate) {
        const checkData = dataToTranslate[fieldName];

        if (!checkData) {
          translatedData[fieldName] = checkData;
        } else if (Array.isArray(checkData) && checkData.length === 0) {
          translatedData[fieldName] = checkData;
        } else if (typeof checkData === "boolean") {
          translatedData[fieldName] = checkData;
        } else {
          const response = await strapi
            .plugin("strapi-google-translate")
            .service("translationServiceGoogle")
            .doTranslation(
              fieldName,
              dataToTranslate,
              sourceLocale,
              targetLocale,
              collectionName,
              token
            );
          translatedData[fieldName] = response;
        }
      }
      translatedData.locale = targetLocale;
      translatedData.publishedAt = new Date().toISOString();

      return translatedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // saving translated data I8N plugin
  async saveTranslation(
    backendUrl,
    collectionTypeSlug,
    sourceId,
    translatedFields,
    apiToken
  ) {
    try {
      const { kind, info } = strapi.contentTypes[collectionTypeSlug];

      let url;
      if (kind === "singleType") {
        url = `${backendUrl}/api/${info.singularName}/localizations`;
      } else {
        url = `${backendUrl}/api/${info.pluralName}/${sourceId}/localizations`;
      }

      const response = await axiosInstance.post(url, translatedFields, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new ApplicationError(
        `Unable to save translation : ${error.message} `
      );
    }
  },

  // Update translated data
  async updateTranslation(
    backendUrl,
    collectionTypeSlug,
    id,
    translatedFields,
    token,
    targetLocale
  ) {
    try {
      delete translatedFields.publishedAt;
      translatedFields.updatedAt = new Date().toISOString();

      const { kind } = strapi.contentTypes[collectionTypeSlug];

      let url;
      if (kind === "singleType") {
        url = `${backendUrl}/content-manager/single-types/${collectionTypeSlug}?plugins[i18n][locale]=${targetLocale}`;
      } else {
        url = `${backendUrl}/content-manager/collection-types/${collectionTypeSlug}/${id}`;
      }

      const response = await axiosInstance.put(url, translatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new ApplicationError(
        `Unable to update translation : ${error.message} `
      );
    }
  },
});
