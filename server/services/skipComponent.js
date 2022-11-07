const { ApplicationError } = require("@strapi/utils").errors;
const _ = require("lodash");

module.exports = ({ strapi }) => ({
  async doSkipComponent(data) {
    try {
      let result;

      //checking if the parent component is Array
      if (Array.isArray(data)) {
        const resultArray = [];
        for (component of data) {
          const newObject = {};

          // loop through each properties of the component
          for (const objKey in component) {
            if (objKey === "id") {
            }

            // checking for child component is an array
            else if (component[objKey] && Array.isArray(component[objKey])) {
              const innerArray = [];
              const data = component[objKey];
              for (const innerObj of data) {
                const respone = await strapi
                  .plugin("strapi-google-translator")
                  .service("translateService")
                  .getTranslatableData(innerObj);

                innerArray.push(respone);
              }

              newObject[objKey] = innerArray;
            }

            // checking for child component is an object
            else if (
              component[objKey] &&
              typeof component[objKey] === "object"
            ) {
              const respone = await strapi
                .plugin("strapi-google-translator")
                .service("translateService")
                .getTranslatableData(component[objKey]);

              newObject[objKey] = respone;
            } else {
              newObject[objKey] = component[objKey];
            }
          }
          resultArray.push(newObject);
        }
        result = resultArray;
      }

      // checking if the parent component is an object
      else if (!Array.isArray(data)) {
        const newObject = {};
        // loop object

        for (let key in data) {
          if (key === "id") {
          }

          // checking if the child component is an array
          else if (data[key] && Array.isArray(data[key])) {
            const innerArray = [];
            for (const innerObj of data[key]) {
              const respone = await strapi
                .plugin("strapi-google-translator")
                .service("translateService")
                .getTranslatableData(innerObj);

              innerArray.push(respone);
            }

            newObject[key] = innerArray;
          }

          // checking if the child component is an object
          else if (data[key] && typeof data[key] === "object") {
            newObject[key] = await strapi
              .plugin("strapi-google-translator")
              .service("translateService")
              .getTranslatableData(data[key]);
          } else {
            newObject[key] = data[key];
          }
        }
        result = newObject;
      }

      return result;
    } catch (error) {
      throw new ApplicationError(`Error in skip component : ${error.message}`);
    }
  },
});
