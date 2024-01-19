import {
  Button,
  Dialog,
  Em,
  Flex,
  RadioGroup,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { getLabelAsString, getManifest, isURL } from "lib/iiif-helpers";

import getApiResponse from "lib/getApiResponse";
import { projectTitle } from "data";
import { toast } from "sonner";
import { toastDefaults } from "lib/vendor/sonner";
import { useAppContext } from "context/AppContext";

const Required = () => {
  return (
    <Strong color="crimson" style={{ color: "var(--crimson-9)" }}>
      *
    </Strong>
  );
};

const UIAddManifest = () => {
  const [provider, setProvider] = useState<string>();
  const [uri, setUri] = useState<string>();

  const { state } = useAppContext();
  const { authToken } = state;

  const handleAddManifest = async () => {
    try {
      if (!uri) throw new Error("The URL is not set.");
      if (!provider) throw new Error("The Providing Institution is not set.");

      if (uri) {
        if (!isURL(uri)) throw new Error("The Manifest URL is invalid");

        const manifest = await getManifest(uri);

        if (!manifest?.label || manifest?.type !== "Manifest")
          throw new Error("The IIIF Manifest is invalid.");

        const label = getLabelAsString(manifest?.label);

        const response = await getApiResponse({
          route: "/annotation",
          options: {
            method: "POST",
            body: JSON.stringify({
              label,
              provider,
              publicStatus: false,
              sortKey: "METADATA",
              uri,
            }),
            headers: { Authorization: `Bearer ${authToken}` },
          },
        });

        if (response?.uri) {
          toast.dismiss();
          toast.success(`Success`, {
            description: `Manifest added successfully.`,
            ...toastDefaults,
          });
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Error`, {
        description: `${error}`,
        ...toastDefaults,
      });
      return;
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">Add Manifest</Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Add Manifest</Dialog.Title>
        <Dialog.Description size="3" mb="5" weight="light">
          Include a new Manifest in the <Em>{projectTitle}</Em> IIIF Collection
        </Dialog.Description>

        <Flex direction="column" gap="4">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              URL <Required />
            </Text>
            <TextField.Input
              name="url"
              onChange={(event) => setUri(event.target.value)}
              placeholder="The accessible URL of the source IIIF Manifest"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Providing Institution <Required />
            </Text>
            <RadioGroup.Root name="provider">
              <Flex gap="2">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item
                      onClick={() => setProvider("Northwestern")}
                      value="Northwestern"
                    />
                    Northwestern
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item
                      onClick={() => setProvider("UIUC")}
                      value="UIUC"
                    />{" "}
                    UIUC
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleAddManifest}>Add</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UIAddManifest;
