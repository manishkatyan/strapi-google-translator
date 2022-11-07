import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import FileError from "@strapi/icons/FileError";
import Cross from "@strapi/icons/Cross";
import { Flex } from "@strapi/design-system/Flex";
import { Stack } from "@strapi/design-system/Stack";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import Check from "@strapi/icons/Check";
import { Loader } from "@strapi/design-system/Loader";

const ConfirmDialog = ({
  dialogId,
  isVisible,
  handleClose,
  handleConfirm,
  message,
  heading,
  state,
  loading,
}) => {
  const getDialogFooter = () => {
    let footer;
    if (state === "CONFIRMATION") {
      footer = (
        <DialogFooter
          startAction={
            <Button onClick={handleClose} variant="tertiary">
              Cancel
            </Button>
          }
          endAction={
            <Button
              variant="secondary"
              startIcon={<Check />}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          }
        />
      );
    } else if (state === "ERROR") {
      footer = (
        <DialogFooter
          startAction={
            <Button
              variant="danger-light"
              startIcon={<Cross />}
              onClick={handleClose}
            >
              Close
            </Button>
          }
          endAction={<></>}
        />
      );
    } else if (state === "SUCCESS") {
      footer = (
        <DialogFooter
          startAction={
            <Button
              variant="success"
              startIcon={<check />}
              onClick={handleClose}
            >
              Close
            </Button>
          }
          endAction={<></>}
        />
      );
    }
    return footer;
  };

  const getBodyIcon = () => {
    let icon;
    if (state === "CONFIRMATION") {
      icon = loading ? "" : <ExclamationMarkCircle />;
    } else if (state === "ERROR") {
      icon = loading ? "" : <FileError />;
    } else if (state === "SUCCESS") {
      icon = "";
    }
    return icon;
  };
  return (
    <div>
      <Dialog
        id={dialogId}
        onClose={handleClose}
        title={heading}
        isOpen={isVisible}
      >
        <DialogBody icon={getBodyIcon()}>
          <Stack size={2}>
            <Flex justifyContent="center">
              {loading ? (
                <Loader>Waiting for response...</Loader>
              ) : (
                <Typography id="confirm-description">{message}</Typography>
              )}
            </Flex>
          </Stack>
        </DialogBody>
        {loading ? "" : getDialogFooter()}
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  dialogId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ConfirmDialog;
