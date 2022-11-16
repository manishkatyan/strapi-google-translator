<div align="center">
   <img alt="stripe payment title" width="60" src="./static/translator.png">
</div>
<h1 align="center">Strapi Translator</h1>
<p align="center">Easily translate your Strapi content into 100+ languages.</p>

<p align="center">With one-click, this free plugin translates your Strapi collections into 100+ languages using Google Cloud Translate. It supports multiple translation strategies including Text, HTML, String and Skip. In addition, you can specify Glossaries, such as brand name, that should not get translated.</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/strapi-google-translator">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/strapi-google-translator?label=npm&logo=npm">
</a>
<a href="https://www.npmjs.org/package/strapi-google-translator">
<img src="https://img.shields.io/npm/dm/strapi-google-translator.svg" alt="Monthly download on NPM" />
</a>
<a href="https://snyk.io/test/github/manishkatyan/strapi-google-translator">
<img src="https://snyk.io/test/github/manishkatyan/strapi-google-translator/badge.svg" alt="synk" />
</p>

<br>

<img style="width: 100%; height: auto;" src="./static/translator-overview.gif" alt="Translator-gif" /> <br/>

<br/><br/>

## Google Cloud Translate

[Google Cloud Translate](https://cloud.google.com/translate) makes your content multilingual with fast, dynamic machine translation.

Why should you bother translating your content? Well, there are several reasons for you to translate your content:

1. Reach global markets through internationalization of your products
2. Engage your audience with compelling localization of your content
3. Deliver seamless user experience with real-time translation

### Google Cloud Translate Benefits

- Unparalleled language support: Use machine translation to detect more than one hundred languages, from Afrikaans to Zulu. Build custom models in more than fifty language pairs using our no-code AutoML technology.
- Best-in-class quality: Google has a rich history of providing translation services to consumers and organizations. Our proven models and tools bring Google’s translation expertise with industry-leading accuracy.
- Domain specificity: Customize our translation services to understand industry slang, or domain-specific terms. Maintain the context and meaning in translations of technical documents, product descriptions, and social content.

[Strapi](https://strapi.io/) is the leading open-source headless Content Management System. It’s 100% JavaScript, fully customizable and developer-first.

## Overview: Easily translate your content

Translator plugin enables you to translate your Strapi content into 100+ languages.

Setting up the plugin is super easy and can be completed within 10 minutes.

1. Enter your enviornment variables in `.env` file.
2. Add the list of languages, that you want to translate into, in Strapi Settings.
3. Enable localization for the content type that you want to translate.
4. Go to Content Manager, select the collection type that you want to translate, select the languages and click on `translate`.

<br/><br/>

## ✨ Features

1. Quick installation and setup.
1. Easily translate your content to 100+ languages.
1. Confugurable translation strategy schema for each field of a given content type.

### Translation Strategies

Following are the supported translation strategies:

1. String: translated as simple string, Glossary should work
2. Text: translated as simple string, Glossary should work
3. HTML: should be transformed to html first, translated and then converted back to markdown. Glossary should work.
4. Skip: should be skipped for translation, but still moved as is; It could be used for field types such as image and file

<br/><br/>

## 🖐 Requirements

The requirements to install the Translator plugin is the same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=14.x.x <=18.x.x`
- NPM `>=6.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi V4.4.5 (recently tested)

> The Translator plugin is designed for **Strapi v4.x**. It won't work with Strapi v3.x.

<br/><br/>

## ⏳ Installation

Use **npm** to install this plugin within your Strapi project.

[Refer to this doc to install npm](https://docs.npmjs.com/cli/v6/commands/npm-install)

```bash
npm i strapi
```

After successful installation please add the below enviornment variables in `.env` files

```bash
STRAPI_BACKEND_URL=http://localhost:1337
STRAPI_GOOGLE_TRANSLATE_API_TOKEN=your strapi api token
GOOGLE_TRANSLATE_JSON={"type":"service_account","project_id":"your project_id","private_key_id":"your private key id","private_key":"-----BEGIN PRIVATE KEY-----\your private key\n-----END PRIVATE KEY-----\n","client_email": "your client email","client_id": "your client id","auth_uri": "your auth uri","token_uri": "your token uri","auth_provider_x509_cert_url": "your provider secret","client_x509_cert_url": "your client"}
```

> Please make sure to add your Google Service Account JSON in a single sentence as shown above.

> Also to create Strapi api token, Go to Settingd &gt; API Tokens &gt; Create new Api Tokens &gt; Enter API name, Select Token duration `Unlimited` , Select Token type `Full Access` &gt; Save &gt; Copy the API Token and Add in your `.env` file.

After adding enviornment variables `.env` files, goto Config &gt; `plugins.js` &gt; Add the following code snippet.

```
module.exports = ({ env }) => ({

  "strapi-google-translator": {
    enabled: true,
    config: {
      backendUrl: env("STRAPI_BACKEND_URL"),
      apiToken: env("STRAPI_GOOGLE_TRANSLATE_API_TOKEN"),
      googleJson: env("GOOGLE_TRANSLATE_JSON"),
    },
  },
});

```

Afterwards, you would need to build a fresh package that includes the Translator plugin. For it, please execute the commands below:

```bash
# with npm (option 1)
$ npm run build
$ npm run develop

# with npx (option 2)
$ npx strapi  build
$ npx strapi  develop
```

The Translator plugin should appear in the **Plugins** section of the Strapi sidebar after you run the app again.

<br/><br/>

## 🔧 Configuration

You can easily configure the Stripe Translator plugin.

- Go to `setting -> Translator -> Configuration`.
- On the configuration page, you can select translation strategy for each field.
- Click on Save to save the Translator confiiguration.

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright © 2021 [AsyncWeb Technology](https://higheredlab.com/)
