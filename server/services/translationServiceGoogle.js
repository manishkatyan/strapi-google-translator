const axiosInstance = require("axios");
const _ = require("lodash");
const { ApplicationError } = require("@strapi/utils").errors;
const { v4: uuidv4 } = require("uuid");
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

module.exports = ({ strapi }) => ({
  async initialize(sourceCollectionType) {
    const setting = await strapi
      .plugin("strapi-google-translate")
      .service("settingService")
      .getSetting();

    const collection = "contentType";

    const schemaFilter = setting[collection]?.filter(
      (content) => content.collectionName === sourceCollectionType
    );

    const settings = {
      schema: schemaFilter[0].attribute,
      glossaries: setting.glossary,
    };
    return settings;
  },

  async doTranslation(
    fieldName,
    dataToTranslate,
    sourceLocale,
    targetLocale,
    sourceCollectionType,
    token
  ) {
    try {
      const { googleJson } = await strapi.config.get(
        "plugin.strapi-google-translate"
      );
      const googleEnv = JSON.parse(googleJson);

      const { schema, glossaries } = await this.initialize(
        sourceCollectionType
      );

      const strategy = await this.getTranslationStrategy(
        fieldName,
        schema,
        dataToTranslate,
        glossaries
      );

      let response;
      switch (strategy?.type) {
        case "skip":
          response = strategy.result;
          break;

        case "uid":
          response = uuidv4();
          break;

        case "json":
          response = strategy.result;
          break;

        default:
          // Instantiates a client
          const translate = new Translate({
            credentials: googleEnv,
            projectId: googleEnv.project_id,
          });
          const text = strategy.data;
          const target = targetLocale;
          const [translation] = await translate.translate(text, target);

          const result = this.removeIgnoreTag(translation);
          response = result;
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new ApplicationError(
        `Unable to get response from google cloud translation : ${error.message}`
      );
    }
  },

  async getTranslationStrategy(fieldName, schema, dataToTranslate, glossaries) {
    const translationStrategy = schema.filter(
      (attribute) => attribute.name === fieldName
    );

    let strategy;

    switch (translationStrategy[0]?.translationSchema) {
      case "string":
        strategy = this.translateString(
          dataToTranslate[fieldName],

          glossaries
        );

        break;

      case "text":
        strategy = this.translateText(
          dataToTranslate[fieldName],

          glossaries
        );

        break;

      case "html":
        strategy = this.translateHtml(
          dataToTranslate[fieldName],

          glossaries
        );

        break;

      case "skip":
        strategy = await this.skipTranslate(
          dataToTranslate[fieldName],
          translationStrategy[0]?.component
        );
        break;

      case "uid":
        strategy = this.translateUid();
        break;

      case "json":
        strategy = this.translateJson(dataToTranslate[fieldName]);
        break;

      default:
        strategy = this.translateText(
          dataToTranslate[fieldName],

          glossaries
        );
    }

    return strategy;
  },

  translateUid() {
    return { type: "uid" };
  },

  translateJson(data) {
    let result;
    if (data) {
      result = JSON.parse(data);
    } else {
      result = data;
    }
    return { type: "json", result };
  },

  translateString(data, glossaries) {
    const glossaryData = this.preProcessGlossary(data, glossaries);

    return { data: glossaryData };
  },

  translateText(data, glossaries) {
    const glossaryData = this.preProcessGlossary(data, glossaries);

    return { data: glossaryData };
  },

  translateHtml(data, glossaries) {
    const glossaryData = this.preProcessGlossary(data, glossaries);

    return { data: glossaryData };
  },

  async skipTranslate(data, componentType) {
    let result;
    if (componentType) {
      result = await strapi
        .plugin("strapi-google-translate")
        .service("skipComponent")
        .doSkipComponent(data);
    } else if (Array.isArray(data)) {
      response = data.map((record) => _.pick(record, ["id"]));
      result = response;
    } else {
      result = data;
    }

    return { type: "skip", result };
  },

  preProcessGlossary(data, glossaries) {
    let replaceString = data;
    let regex;

    for (let i = 0; i < glossaries.length; i++) {
      regex = new RegExp("\\b" + glossaries[i] + "\\b", "ig");

      replaceString = replaceString.replace(
        regex,
        `<span translate="no">${glossaries[i]}</span>`
      );
    }

    const codeRegx = /^```(?:)\n([\s\S]*?)```$/gm;
    replaceString = replaceString.replace(
      codeRegx,
      (data) => `<span translate="no">${data}</span>`
    );

    const openSquare = /\[/g;
    replaceString = replaceString.replace(
      openSquare,
      (data) => `<span translate="no">${data}</span>`
    );

    const closeSquare = /\]/g;
    replaceString = replaceString.replace(
      closeSquare,
      (data) => `<span translate="no">${data}</span>`
    );

    return replaceString;
  },

  removeIgnoreTag(data) {
    let replaceString = data;
    let regex;

    regex = new RegExp('<span translate="no">([^<]+)</span>', "ig");
    replaceString = replaceString.replace(regex, "$1");

    const quoteRegx = new RegExp("&gt;", "g");
    replaceString = replaceString.replace(quoteRegx, ">");

    const ampRegx = new RegExp("&amp;", "g");
    replaceString = replaceString.replace(ampRegx, "&");

    return replaceString;
  },
});
