"use strict";
const _ = require("lodash");

module.exports = ({ strapi }) => ({
  async saveSetting(data) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-google-translator",
    });
    const { contentType, glossary, componentType } = data;
    let contentTypeResponse;

    if (contentType)
      contentTypeResponse = await pluginStore.set({
        key: "contentType",
        value: contentType,
      });

    if (glossary)
      await pluginStore.set({
        key: "glossary",
        value: glossary,
      });

    if (componentType)
      await pluginStore.set({
        key: "component",
        value: componentType,
      });

    return contentTypeResponse;
  },

  async getSetting() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-google-translator",
    });

    const glossary = await pluginStore.get({ key: "glossary" });
    const contentType = await pluginStore.get({ key: "contentType" });
    const component = await pluginStore.get({ key: "component" });

    return { glossary, contentType, component };
  },

  async getContentTypes(data, collectionType) {
    const arrayObject = (obj) => Object.assign([], Object.values(obj));
    const result = arrayObject(data);

    //structuring the array for easy to traverse in frontend
    let contentData = [];

    const setting = await this.getSetting();

    const handleData = (contentTypes, idx) => {
      let attributes;
      let data;
      if (collectionType === "component") {
        (data = contentTypes),
          (attributes = Object.entries(contentTypes.__schema__.attributes).map(
            ([key, val]) => ({ key, ...val })
          ));
      } else {
        data = Object.entries(contentTypes).map(([key, val]) => ({
          key,
          ...val,
        }));
        attributes = Object.entries(data[0].__schema__.attributes).map(
          ([key, val]) => ({ key, ...val })
        );
      }

      const getTranslationSchema = (name, type, collectionName) => {
        // if already content Types configured

        const configured = setting[collectionType]?.filter(
          (content) => content.collectionName === collectionName
        );

        const attribute = configured
          ? configured[0]?.attribute.filter((attr) => attr.name === name)
          : [];

        let schema;

        if (attribute && attribute.length > 0) {
          schema = attribute[0].translationSchema;
        } else {
          switch (type) {
            case "relation":
              schema = "skip";
              break;

            case "richtext":
              schema = "html";
              break;

            case "media":
              schema = "skip";
              break;

            case "component":
              schema = "skip";
              break;

            case "string":
              schema = "string";
              break;

            case "uid":
              schema = "uid";
              break;

            case "json":
              schema = "json";
              break;

            case "dynamiczone":
              schema = "skip";
              break;

            case "text":
              schema = "text";
              break;

            default:
              schema = "skip";
          }
        }

        return schema;
      };

      const getComponet = (component, dynamicComponent) => {
        let result;
        if (component) {
          result = component;
        } else if (dynamicComponent) {
          result = dynamicComponent;
        } else {
          result = "";
        }
        return result;
      };

      if (collectionType === "component") {
        contentData = [
          ...contentData,
          {
            id: idx + 1,
            name: data.info.displayName,
            collectionName: data.uid,
            attribute: _.flatMap(attributes, (attr) => [
              {
                id: Math.floor(Math.random() * 10000),
                name: attr.key,
                type: attr.type,
                relationSlug: attr.type === "relation" ? attr.target : "",
                component: getComponet(attr?.component, attr?.components),
                translationSchema: getTranslationSchema(
                  attr.key,
                  attr.type,
                  data.uid
                ),
              },
            ]),
          },
        ];
      } else {
        contentData = [
          ...contentData,
          {
            id: idx + 1,
            name: data[0].info.displayName,
            collectionName: data[0].collectionName,
            attribute: _.flatMap(attributes, (attr) => [
              {
                id: Math.floor(Math.random() * 10000),
                name: attr.key,
                type: attr.type,
                relationSlug: attr.type === "relation" ? attr.target : "",
                component: getComponet(attr?.component, attr?.components),
                translationSchema: getTranslationSchema(
                  attr.key,
                  attr.type,
                  data[0].collectionName
                ),
              },
            ]),
          },
        ];
      }
    };
    if (collectionType === "component") {
      result.map((contentTypes, idx) => handleData(contentTypes, idx));
    } else {
      result.map(({ contentTypes }, idx) => handleData(contentTypes, idx));
    }

    return contentData;
  },
});
