<h1 align="center">Strapi Translator</h1>
<p align="center">Easily translate your Strapi collections into multiple languages using Google Cloud Translate. It can easily be extedned to support relations and components.</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/strapi-google-translator">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/strapi-google-translator?label=npm&logo=npm">
</a>
<a href="https://www.npmjs.org/package/strapi-google-translator">
<img src="https://img.shields.io/npm/dm/strapi-google-translator.svg" alt="Monthly download on NPM" />
</a>

</p>

<br>

<img style="width: 100%; height: auto;" src="./static/translator-overview.gif" alt="Translator-gif" /> <br/>

<br/><br/>

## Translator plugin for Strapi

[Google Cloud Translate](https://cloud.google.com/translate) Make your content and apps multilingual with fast, dynamic machine translation.

[Strapi](https://strapi.io/) is the leading open-source headless Content Management System. It’s 100% JavaScript, fully customizable and developer-first.

## Overview: Start your Content Translation

Translator plugin enables you to translate your Strapi content into multiple languages.

Setting up the plugin is super easy and can be completed within 10 minutes.

1. Enter your enviornment variables in `.env` file.
2. Add the list of languages you want in strapi setting.
3. Enable localization for the content type you want to translate.
4. Go to content manager select the collection type you want to translate,select language and click on translate.

<br/><br/>

## ✨ Features

1. Quick installation and setup.
1. Easily translate your content to other languages.
1. Able to configure translation strategy schema for each field of the particular content type.

<br/><br/>

## 🖐 Requirements

The requirements to install the Stripe Payments plugin is the same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=14.x.x <=18.x.x`
- NPM `>=6.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi V4.4.5 (recently tested)

> The translator plugin is designed for **Strapi v4.x**. It won't work with Strapi v3.x.

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

> Please make sure to add your google translate json in one line as shown above.

> Also to create strapi api token, Go to settingd &gt; API Tokens &gt; Create new Api Tokens &gt; enter api name, select token duration `Unlimited` , select Token type `Full Access` &gt; save &gt; copy the api token and add in your `.env` file.

After adding enviornment variables `.env` files.
Goto config &gt; `plugins.js` &gt; add the following code snippet.

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

After you would need to build a fresh package that includes the Google Translate plugin UI. Execute the commands below:

```bash
# with npm (option 1)
$ npm run build
$ npm run develop

# with npx (option 2)
$ npx strapi  build
$ npx strapi  develop
```

The ** Translator** plugin should appear in the **Plugins** section of the Strapi sidebar after you run the app again.

Now you are ready to accept online payments via Stripe on your Strapi website 🎉

<br/><br/>

## 🔧 Configuration

You can easily configure the Stripe Payments plugin to connect with your Stripe Account.

- Go to `setting -> Translator -> Configuration`.
- On the configuration page, you can select translation strategy for each field.
- Click on Save to save the Translator confiiguration.

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright (c) AsyncWeb Technology.
