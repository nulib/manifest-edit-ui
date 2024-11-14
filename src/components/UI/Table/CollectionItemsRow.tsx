import { ActionTypes, useAppContext } from "context/AppContext";
import { Badge, Button, Flex, Link, Table, Text } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import DeleteManifest from "components/UI/DeleteManifest";
import { ManifestEditorManifest } from "types/manifest-editor";

interface UITableRowProps {
  item: ManifestEditorManifest;
}

const UITableRow: React.FC<UITableRowProps> = ({ item }) => {
  const { dispatch } = useAppContext();

  const handleManifestClick: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Manifest" });
    dispatch({ type: ActionTypes.SET_ACTIVE_MANIFEST, payload: item.uri });
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Text asChild size="3" weight="medium">
          <Link href="#" onClick={handleManifestClick} underline="hover">
            {item.label}
          </Link>
        </Text>
      </Table.Cell>
      <Table.Cell>{item.provider}</Table.Cell>
      <Table.Cell>
        {item.publicStatus ? (
          <Badge variant="outline">Public</Badge>
        ) : (
          <Badge variant="outline" color="gray">
            Private
          </Badge>
        )}
      </Table.Cell>
      <Table.Cell>
        <Flex justify="end" gap="3">
          <Button onClick={handleManifestClick}>View</Button>
          <DeleteManifest
            disabled={item.publicStatus}
            label={item.label}
            uri={item.uri}
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default UITableRow;
