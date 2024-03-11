import { ActionTypes, useAppContext } from "context/AppContext";
import {
  Badge,
  Button,
  Callout,
  Checkbox,
  Dialog,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";

import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import getApiResponse from "lib/getApiResponse";
import { toast } from "sonner";
import { toastDefaults } from "lib/vendor/sonner";
import { v4 as uuidv4 } from "uuid";

const UIDeleteManifest = ({
  disabled,
  label,
  uri,
}: {
  disabled: boolean;
  label: string;
  uri: string;
}) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const { state, dispatch } = useAppContext();
  const { authToken } = state;

  const handleDeleteManifest = async () => {
    try {
      const response = await getApiResponse({
        route: "/metadata",
        options: {
          method: "DELETE",
          body: JSON.stringify({
            sortKey: "METADATA",
            uri,
          }),
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });

      if (response?.uri) {
        toast.dismiss();
        toast.success(`Deleted Manifest`, {
          description: label,
          icon: <Cross2Icon />,
          ...toastDefaults,
        });

        dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
        dispatch({ type: ActionTypes.SET_SCREEN_ID, payload: uuidv4() });
        dispatch({ type: ActionTypes.SET_ACTIVE_MANIFEST, payload: undefined });
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
    <Dialog.Root onOpenChange={() => setConfirmDelete(false)}>
      <Dialog.Trigger>
        <Button
          color="ruby"
          variant="soft"
          disabled={disabled}
          aria-disabled={disabled}
          title={disabled ? "Public Manifests cannot be deleted." : ""}
        >
          Delete
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Manifest</Dialog.Title>
        <Dialog.Description size="3" mb="5" weight="light"></Dialog.Description>

        <Flex direction="column" gap="4">
          <Callout.Root color="ruby">
            <Callout.Icon>
              <Cross2Icon />
            </Callout.Icon>
            <Callout.Text>
              <Strong>{label}</Strong>
            </Callout.Text>
          </Callout.Root>
          <Text size="3" weight="light">
            Are you sure you want to permanently delete this Manifest? This
            action cannot be undone.
          </Text>
          <Text as="label" size="3" weight="light">
            <Flex gap="2">
              <Checkbox
                onCheckedChange={() => setConfirmDelete(!confirmDelete)}
              />
              <Strong>Yes, delete this Manifest</Strong>
            </Flex>
          </Text>
        </Flex>

        <Flex gap="3" mt="7" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              color="ruby"
              onClick={handleDeleteManifest}
              disabled={!confirmDelete}
            >
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UIDeleteManifest;
