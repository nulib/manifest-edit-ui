import { Box, Em, Section, Table, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import { ManifestEditorManifest } from "types/manifest-editor";
import UITable from "components/UI/Table/Table";
import UITableCollectionItemsRow from "components/UI/Table/CollectionItemsRow";
import getApiResponse from "lib/getApiResponse";
import { projectTitle } from "data";
import { useAppContext } from "context/AppContext";

const Collection = () => {
  const [manifests, setManifests] = useState<ManifestEditorManifest[]>([]);

  const { state } = useAppContext();
  const { authToken } = state;

  useEffect(() => {
    (async () => {
      const response = await getApiResponse({
        route: "/manifests",
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });
      setManifests(response);
    })();
  }, []);

  return (
    <Section size="1" pr="5" pl="5">
      <Text size="3" weight="light">
        Manifests available for the <Em>{projectTitle}</Em> IIIF Collection
      </Text>
      <Box pt="4">
        <UITable>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Label</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Provider</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <span style={{ visibility: "hidden" }}>Actions</span>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {manifests?.map((item) => (
              <UITableCollectionItemsRow item={item} key={item.uri} />
            ))}
          </Table.Body>
        </UITable>
      </Box>
    </Section>
  );
};

export default Collection;
