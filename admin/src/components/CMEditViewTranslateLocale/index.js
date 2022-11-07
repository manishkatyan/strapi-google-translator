// This component is highly inspired by the CMEditViewCopyLocale component of @strapi/plugin-i18n
// In the following the referenced License by Strapi Solutions

import React, { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Select, Option } from "@strapi/design-system/Select";
import { useSelector } from "react-redux";
import { Alert } from "@strapi/design-system/Alert";
import { Button } from "@strapi/design-system/Button";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import selectI18NLocales from "@strapi/plugin-i18n/admin/src/selectors/selectI18nLocales";
import _ from "lodash";
import { auth } from "@strapi/helper-plugin";
import ConfirmDialog from "./ConfirmDialog";
import { translate } from "../../utils/apiCalls";

const CMEditViewTranslateLocale = () => {
  const { modifiedData, slug } = useCMEditViewDataManager();
  const [values, setValues] = useState([]);
  const [error, toggleError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [remainingLocale, setRemainingLocale] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmHeading, setConfirmHeading] = useState("");
  const [state, setState] = useState("CONFIRM");
  const locales = useSelector(selectI18NLocales);

  useEffect(() => {
    if (modifiedData?.localizations) {
      const translatedLocale = [];

      translatedLocale.push({ locale: modifiedData.locale });

      const filteredLocale = locales.filter((locale) => {
        return !translatedLocale.find((locale2) => {
          return locale2.locale === locale.code;
        });
      });
      setRemainingLocale(filteredLocale);
    }
  }, [modifiedData]);
  console.log(modifiedData);
  const onChangeLanguage = (value) => {
    toggleError();
    setValues(value);
  };

  const handleClick = async () => {
    if (!modifiedData.locale) {
      setConfirmHeading("Error");
      setState("ERROR");
      setMessage("Localization is disabled for this content");
      setConfirmModal(true);
    } else if (values.length === 0) {
      toggleError("Please Select Language");
    } else {
      setConfirmHeading("Confirmation");
      setState("CONFIRMATION");
      setMessage("Are you sure you want to Translate?");
      setConfirmModal(true);
    }
  };

  const handleCloseDialog = () => {
    setConfirmModal(false);
    window.location.reload();
  };

  const token = auth.getToken();

  const handleConfirm = async () => {
    setIsLoading(true);
    setConfirmModal(true);
    const langs = values;
    const sourceData = modifiedData;

    const collectionTypeSlug = slug;

    try {
      const response = await translate(
        {
          langs,
          sourceData,
          collectionTypeSlug,
        },
        token
      );

      if (response?.data?.status === 500) {
        setMessage(response.data.message.message);
        setConfirmHeading("Error");
        setState("ERROR");
        setConfirmModal(true);
      } else {
        setMessage(response.data.message);
        setConfirmHeading("Success");
        setState("SUCCESS");
        setConfirmModal(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      paddingTop={6}
      paddingLeft={4}
      paddingRight={4}
      paddingBottom={4}
      hasRadius
      background="neutral0"
      shadow="tableShadow"
    >
      <Box paddingBottom={2}>
        <Typography variant="sigma" textColor="neutral600" fontWeight="bold">
          Translate
        </Typography>
      </Box>
      <Box paddingBottom={2}>
        <Divider />
      </Box>

      {modifiedData?.localizations ? (
        ""
      ) : (
        <Box paddingTop={2} paddingBottom={2}>
          <Typography variant="pi" textColor="danger600">
            You need to enable localization for Google Translate to work.
          </Typography>
        </Box>
      )}

      <Box paddingTop={2} paddingBottom={4}>
        <Select
          id="select1"
          placeholder="Select Language"
          onClear={() => setValues([])}
          hint="Select Language to Transalate"
          clearLabel="Clear the Languages"
          error={error}
          value={values}
          onChange={onChangeLanguage}
          multi
          withTags
        >
          {remainingLocale.length > 0 &&
            remainingLocale.map((locale) => (
              <Option value={locale.code} key={locale.id}>
                {locale.name}
              </Option>
            ))}
        </Select>
      </Box>

      <Button fullWidth onClick={handleClick} loading={isLoading}>
        Translate
      </Button>
      <ConfirmDialog
        dialogId={`confirm`}
        isVisible={confirmModal}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirm}
        message={message}
        heading={confirmHeading}
        state={state}
        loading={isLoading}
      />
    </Box>
  );
};

export default CMEditViewTranslateLocale;
