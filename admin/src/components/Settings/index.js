/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * UI Elements of Stripe Configuration
 *
 */

import React, { useState, useEffect } from "react";
import { SettingsPageTitle } from "@strapi/helper-plugin";
import Check from "@strapi/icons/Check";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { HeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { Main } from "@strapi/design-system/Main";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import { Select, Option } from "@strapi/design-system/Select";
import { Alert } from "@strapi/design-system/Alert";
import { Loader } from "@strapi/design-system/Loader";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
} from "@strapi/design-system/Accordion";
import { ProgressBar } from "@strapi/design-system/ProgressBar";
import AceEditorSnippet from "./AceEditorSnippet";
import {
  getTranslateConfiguration,
  saveTranslateConfiguration,
} from "../../utils/apiCalls";

const Setting = () => {
  const [contentType, setContentType] = useState([]);
  const [isContentChange, setIsContentChange] = useState(1);

  const [glossaries, setGlossaries] = useState(`["Bus", "Train"]`);

  const [expanded, setExpanded] = useState([]);
  const [isExpand, setIsExpand] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoding, setInitialLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setInitialLoading(true);
    const expandArray = [];

    (async () => {
      const { data } = await getTranslateConfiguration();

      if (data.response) {
        setContentType(data?.response?.contentType);
        data?.response?.contentType.forEach(() => {
          expandArray.push(false);
        });
        setExpanded(expandArray);

        if (data?.response?.glossary)
          setGlossaries(JSON.stringify(data?.response?.glossary));

        setInitialLoading(false);
      }
    })();
  }, []);

  const onClickExpand = (index) => {
    const arr = expanded;
    if (arr[index]) {
      arr[index] = false;
    } else {
      arr[index] = true;
    }

    setExpanded(arr);
    setIsExpand(isExpand + 1);
  };

  const handleChangeSelect = (contentId, attributeId, value) => {
    const newArr = contentType;

    for (const contentType of newArr) {
      if (contentType.id === contentId) {
        for (const attr of contentType.attribute) {
          if (attr.id === attributeId) {
            attr.translationSchema = value;
          }
        }

        break;
      }
    }
    setContentType(newArr);
    setIsContentChange(isContentChange + 1);
  };

  const handleChangeGlossary = (value) => {
    setGlossaries(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const glossary = JSON.parse(glossaries);

    const data = {
      contentType,
      glossary,
    };
    const response = await saveTranslateConfiguration(data);
    setIsSubmitting(false);
    if (response?.data?.response.id) {
      setShowAlert(true);
    }
  };

  const getSelectCollection = (attribute, contentId, idx) => {
    let select;
    if (attribute.type === "component") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"skip"}>Skip</Option>
        </Select>
      );
    } else if (attribute.type === "relation") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"skip"}>Skip</Option>
        </Select>
      );
    } else if (attribute.type === "boolean") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"skip"}>Skip</Option>
        </Select>
      );
    } else if (attribute.type === "uid") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"uid"}>UID</Option>
        </Select>
      );
    } else if (attribute.type === "json") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"json"}>JSON</Option>
        </Select>
      );
    } else if (attribute.type === "dynamiczone") {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
        >
          <Option value={"skip"}>Skip</Option>
        </Select>
      );
    } else {
      select = (
        <Select
          id={`select1${idx}`}
          placeholder="Select the translation schema strategy"
          clearLabel="Clear the schema"
          value={attribute.translationSchema}
          onChange={(value) =>
            handleChangeSelect(contentId, attribute.id, value)
          }
          disabled={attribute.type === "media" ? true : false}
        >
          <Option value={"string"}>String</Option>
          <Option value={"text"}>Text</Option>
          <Option value={"html"}>HTML</Option>
          <Option value={"skip"}>Skip</Option>
        </Select>
      );
    }

    return select;
  };

  return (
    <Main>
      <SettingsPageTitle name="Translator" />
      <HeaderLayout
        title="Translator Configuration"
        primaryAction={
          <Button
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />

      <ContentLayout>
        {initialLoding ? (
          ""
        ) : (
          <Box>
            {showAlert ? (
              <Box paddingBottom={4}>
                <Alert
                  closeLabel="Close alert"
                  title="Translator configuration"
                  variant="success"
                  onClose={() => {
                    setShowAlert(false);
                  }}
                >
                  saved successfully.
                </Alert>
              </Box>
            ) : (
              ""
            )}

            <Box
              shadow="tableShadow"
              background="neutral0"
              paddingTop={6}
              paddingLeft={7}
              paddingRight={7}
              paddingBottom={6}
              hasRadius
            >
              <Box paddingBottom={2}>
                <Typography variant="delta">Glossary</Typography>
              </Box>

              <Box paddingTop={2}>
                <AceEditorSnippet
                  handleChangeEditor={handleChangeGlossary}
                  value={glossaries}
                />
              </Box>
              <Box paddingTop={3}>
                <Typography variant="omega">
                  Add Glossary items that should not get translated.
                </Typography>
              </Box>
            </Box>
            <br />
            <Box
              shadow="tableShadow"
              background="neutral0"
              paddingTop={6}
              paddingLeft={7}
              paddingRight={7}
              paddingBottom={6}
              hasRadius
            >
              <Box paddingBottom={2}>
                <Typography variant="delta">Translation Schema</Typography>
              </Box>

              <Box paddingTop={2}>
                <AccordionGroup>
                  {isContentChange &&
                    contentType.map((content, index) => (
                      <Accordion
                        expanded={isExpand && expanded[index]}
                        onToggle={() => onClickExpand(index)}
                        id="acc-1"
                        size="S"
                        key={index}
                      >
                        <AccordionToggle
                          title={`Collection Type: ${content.name}`}
                          togglePosition="left"
                        />
                        <AccordionContent>
                          <Box padding={3}>
                            {content.attribute.map((attribute, idx) => (
                              <Grid gap={5} key={idx}>
                                <GridItem col={6} s={10}>
                                  <Box
                                    paddingTop={3}
                                    paddingBottom={3}
                                    paddingLeft={2}
                                    shadow="tableShadow"
                                  >
                                    <Typography textTransform="capitalize">
                                      {attribute.name}&nbsp;[{attribute.type}]
                                    </Typography>
                                  </Box>
                                </GridItem>
                                <GridItem col={6} s={14}>
                                  <Box paddingBottom={2}>
                                    {getSelectCollection(
                                      attribute,
                                      content.id,
                                      idx
                                    )}
                                  </Box>
                                </GridItem>
                              </Grid>
                            ))}
                          </Box>
                        </AccordionContent>
                      </Accordion>
                    ))}
                </AccordionGroup>
              </Box>
            </Box>
            <br />
          </Box>
        )}
        <br />
      </ContentLayout>
    </Main>
  );
};

export default Setting;
