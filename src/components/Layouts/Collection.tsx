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

import { ManifestEditorManifest } from "../../types/manifest-editor";
import UITable from "../UI/Table/Table";
import UITableCollectionItemsRow from "../UI/Table/CollectionItemsRow";
import { projectTitle } from "../../data";
import { useAppContext } from "../../context/AppContext";

const Collection = () => {
  const [manifests, setManifests] = useState<ManifestEditorManifest[]>([]);

  const { state } = useAppContext();
  const { authToken } = state;

  useEffect(() => {
    const baseUrl =
      "https://67qdcv50f4.execute-api.us-east-1.amazonaws.com/prod";

    fetch(`${baseUrl}/manifests`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
      redirect: "follow",
    })
      .then(async (response) => await new Response(response.body).json())
      .then((result) => setManifests(result))
      .catch((error) => console.log("error", error));
  }, []);

  if (!manifests) return null;

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
