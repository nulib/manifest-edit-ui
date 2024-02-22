import { Box, Flex, Heading, Switch, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import DeleteManifest from "components/UI/DeleteManifest";
import { ManifestEditorManifest } from "types/manifest-editor";
import getApiResponse from "lib/getApiResponse";
import { useAppContext } from "context/AppContext";

const ManifestHeader = ({ activeManifest }: { activeManifest: string }) => {
  const { state } = useAppContext();
  const { authToken } = state;

  const [metadata, setMetadata] = useState<ManifestEditorManifest>();

  /**
   * Retrieve default values of Manifest
   */
  useEffect(() => {
    getApiResponse({
      route: "/item",
      options: {
        method: "POST",
        body: JSON.stringify({
          uri: activeManifest,
          sortKey: "METADATA",
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    }).then((response) => setMetadata(response));
  }, [activeManifest]);

  /**
   * Update `publicStatus` boolean of Manifest and reset metadata
   */
  const handlePublicChange = (checked: boolean) => {
    getApiResponse({
      route: "/metadata",
      options: {
        method: "PUT",
        body: JSON.stringify({
          ...metadata,
          publicStatus: checked,
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    }).then((response) => setMetadata(response));
  };

  if (!metadata) return null;

  return (
    <Flex justify="between" align="center">
      <Flex gap="5" align="center">
        <Heading size="7">{metadata.label}</Heading>
        <Text size="2">({metadata.provider})</Text>
      </Flex>
      <Text as="label" size="2">
        <Flex gap="5" align="center">
          <Box>
            <Flex gap="2">
              <Switch
                size="3"
                defaultChecked={metadata?.publicStatus}
                onCheckedChange={handlePublicChange}
              />
              Public?
            </Flex>
          </Box>
          <DeleteManifest
            disabled={metadata?.publicStatus}
            label={metadata.label}
            uri={metadata.uri}
          />
        </Flex>
      </Text>
    </Flex>
  );
};

export default ManifestHeader;
