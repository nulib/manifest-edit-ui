import {
  Box,
  Em,
  Section,
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
  Text,
} from "@radix-ui/themes";
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
          headers: { Authorization: `Bearer ${authToken}` },
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
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>Label</TableColumnHeaderCell>
              <TableColumnHeaderCell>Provider</TableColumnHeaderCell>
              <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manifests.map((item) => (
              <UITableCollectionItemsRow item={item} key={item.uri} />
            ))}
          </TableBody>
        </UITable>
      </Box>
    </Section>
  );
};

export default Collection;
