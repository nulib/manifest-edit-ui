import { ActionTypes, useAppContext } from "context/AppContext";
import { Box, Button, DropdownMenu, Flex, Heading } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import { CaretDownIcon } from "@radix-ui/react-icons";
import getApiResponse from "lib/getApiResponse";
import { projectTitle } from "data";
import { toast } from "sonner";
import { toastDefaults } from "lib/vendor/sonner";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Header = () => {
  const { user, signOut } = useAuthenticator();
  const { state, dispatch } = useAppContext();
  const { authToken, collection } = state;

  const handleViewCollection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  const handlePublish: MouseEventHandler<HTMLDivElement> = async () => {
    toast.dismiss();
    const response = await getApiResponse({
      route: "/publish",
      options: {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      },
    });

    if (response?.status !== 200) {
      toast.error(`Error`, {
        description: `The ${projectTitle} Collection could not update.`,
        ...toastDefaults,
      });

      return;
    }

    toast.success(`Publishing...`, {
      description: `The ${projectTitle} Collection will update soon.`,
      ...toastDefaults,
    });
  };

  const handleViewIn: MouseEventHandler<HTMLDivElement> = (e) => {
    // @ts-ignore
    const viewer = e.target?.dataset?.viewer;
    const cloverUrl = `https://samvera-labs.github.io/clover-iiif/docs/viewer/demo?iiif-content=${collection}`;
    const miradorUrl = `https://projectmirador.org/embed/?iiif-content=${collection}`;

    if (typeof window === "undefined") return;

    switch (viewer) {
      case "clover":
        // @ts-ignore
        window?.open(cloverUrl, "_blank").focus();
        break;
      case "mirador":
        // @ts-ignore
        window?.open(miradorUrl, "_blank").focus();
        break;
      default:
        break;
    }

    return;
  };

  return (
    <Box pr="5" pl="5" pt="5">
      <Flex gap="5" justify="between">
        <Heading size="6">{projectTitle} Collection</Heading>
        <Flex gap="3" align="center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                Options
                <CaretDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>View in...</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item
                    onClick={handleViewIn}
                    data-viewer="clover"
                  >
                    Clover IIIF
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={handleViewIn}
                    data-viewer="mirador"
                  >
                    Mirador
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Item onClick={handlePublish}>
                Publish Collection
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Label style={{ fontSize: "0.7em" }}>
                Logged in as {user.username}
              </DropdownMenu.Label>
              <DropdownMenu.Item color="crimson" onClick={signOut}>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button onClick={handleViewCollection}>Available Manifests</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
