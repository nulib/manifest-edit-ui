import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";

import getApiResponse from "../../lib/getApiResponse";
import { on } from "events";
import { useAppContext } from "../../context/AppContext";

const UIDialog = ({
  manifestId,
  method,
  onOpenChange,
  resourceId,
  type,
  defaultValue,
}: {
  manifestId: string;
  method: "POST" | "PUT";
  onOpenChange: () => void;
  resourceId: string;
  type: "transcription" | "translation";
  defaultValue?: string;
}) => {
  const [open, setOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { state } = useAppContext();
  const { authToken } = state;

  const handleSave = async () => {
    const value = textAreaRef.current?.value;
    const sortKey = `${type.toUpperCase()}#${resourceId}`;

    const response = await getApiResponse({
      route: "/annotation",
      options: {
        method,
        body: JSON.stringify({
          uri: manifestId,
          sortKey,
          value,
        }),
        headers: { Authorization: `Bearer ${authToken}` },
      },
    });

    if (response?.value) {
      setOpen(false);
      onOpenChange();
    }
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger onClick={() => setOpen(!open)}>
        <Button variant={method === "PUT" ? "soft" : "solid"}>
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
              ref={textAreaRef}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UIDialog;
