import { Box, Flex, Switch, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import DeleteManifest from "components/UI/DeleteManifest";
import { Manifest } from "@iiif/presentation-3";
import { ManifestEditorManifest } from "types/manifest-editor";
import UIEditString from "../EditString";
import getApiResponse from "lib/getApiResponse";
import { useAppContext } from "context/AppContext";

const ManifestHeader = ({ manifest }: { manifest: Manifest }) => {
  const { state } = useAppContext();
  const { authToken } = state;

  const [metadata, setMetadata] = useState<ManifestEditorManifest>();

  /**
   * Retrieve default values of Manifest
   */
  useEffect(() => refreshMetadata(), [manifest.id]);

  const refreshMetadata = () => {
    getApiResponse({
      route: "/item",
      options: {
        method: "POST",
        body: JSON.stringify({
          uri: manifest.id,
          sortKey: "METADATA",
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    }).then((response) => setMetadata(response));
  };

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

  const handleStringSave = (metadata: ManifestEditorManifest) => {
    getApiResponse({
      route: "/metadata",
      options: {
        method: "PUT",
        body: JSON.stringify({
          ...metadata,
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
    <Flex align="center" gap="6">
      <Flex gap="1" direction="column" flexGrow="1">
        <Text mb="2" size="1" color="gray">
          {metadata.provider}
        </Text>
        <UIEditString
          attribute="label"
          metadata={metadata}
          onSave={handleStringSave}
          originalValue={manifest?.label}
          textProps={{
            size: "4",
            weight: "bold",
          }}
        />
        <UIEditString
          attribute="summary"
          metadata={metadata}
          onSave={handleStringSave}
          originalValue={manifest?.summary}
        />
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
