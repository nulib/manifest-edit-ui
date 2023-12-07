import { ActionTypes, useAppContext } from "context/AppContext";
import { Box, Button, DropdownMenu, Flex, Heading } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import { CaretDownIcon } from "@radix-ui/react-icons";
import { projectTitle } from "data";
import { toast } from "sonner";
import { toastDefaults } from "lib/vendor/sonner";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Header = () => {
  const { user, signOut } = useAuthenticator();
  const { dispatch } = useAppContext();

  const handleViewCollection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  const handlePublish: MouseEventHandler<HTMLDivElement> = () => {
    toast(`Publishing Collection`, {
      description: `The ${projectTitle} Collection will soon be updated.`,
      ...toastDefaults,
    });
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
                  <DropdownMenu.Item>Clover IIIF</DropdownMenu.Item>
                  <DropdownMenu.Item>Mirador</DropdownMenu.Item>
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
