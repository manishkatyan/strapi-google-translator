/*
 *
 * HomePage component
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Link } from "@strapi/design-system/Link";
import ArrowRight from "@strapi/icons/ArrowRight";
import pluginPkg from "../../../../package.json";

const Home = () => {
  return (
    <Box>
      <Box paddingTop={6} paddingLeft={7}>
        <Typography variant="alpha">Translator</Typography>
        <Box>
          <Typography variant="omega">
            Use Translator plugin to easily translate your Strapi content into
            multiple languages.
          </Typography>
        </Box>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <Box paddingTop={6} paddingBottom={6} paddingLeft={7} paddingRight={7}>
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box>
            <Grid gap={4}>
              <GridItem col={6} s={12}>
                <Link
                  to="/settings/strapi-google-translator"
                  endIcon={<ArrowRight />}
                >
                  Manage Your Translator Configuration
                </Link>
              </GridItem>
              <GridItem col={6} s={12}>
                <Typography>
                  Plugin version:&nbsp;{pluginPkg.version}
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box paddingTop={6} paddingBottom={6} paddingLeft={7} paddingRight={7}>
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingBottom={6}>
            <Typography variant="beta">How to use</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography>
              To initiate Translation for a content, you need to do following
              steps:
            </Typography>
          </Box>
          <Box paddingLeft={2}>
            <Typography>
              1. Go to Settings &gt; Internationalization &gt; Add a new locale
              &gt; select the locales you want.
            </Typography>
          </Box>
          <Box paddingTop={1} paddingLeft={2}>
            <Typography>
              2. Enable localization for the content type you want to translate.{" "}
              Go to Content Type Builder &gt; select the content you want &gt;
              click on Edit &gt; click on Advanced Settings &gt; Check Enable
              localization for this Content-Type.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box paddingTop={6} paddingBottom={6} paddingLeft={7} paddingRight={7}>
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box>
            <Grid gap={4}>
              <GridItem col={4} s={12}>
                <Typography>
                  Have questions? Contact us at : support@asyncweb.io
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
