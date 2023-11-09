import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

import React from "react";
import { mock } from "../../data";

const UIDialog = ({
  method,
  type,
}: {
  method: "Add" | "Update";
  type: "Transcription" | "Translation";
}) => {
  // @ts-ignore
  const defaultValue = "";

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant={method === "Update" ? "soft" : "solid"}>
          {method} {type}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 600 }}>
        <Flex direction="column" gap="3">
          <label>
            <Dialog.Title>Edit {type}</Dialog.Title>
            <TextArea
              defaultValue={defaultValue}
              placeholder={`Add ${type.toLowerCase()}`}
              style={{ height: "300px", maxHeight: "50vh" }}
              size="2"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UIDialog;
