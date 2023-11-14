import { ActionTypes, useAppContext } from "context/AppContext";
import {
  Box,
  Button,
  DropdownMenu,
  Em,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { CaretDownIcon, ListBulletIcon } from "@radix-ui/react-icons";
import React, { MouseEventHandler } from "react";

import { projectTitle } from "data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Header = () => {
  const { user, signOut } = useAuthenticator();
  const { dispatch } = useAppContext();

  const handleViewCollection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
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
              <DropdownMenu.Item>Publish Collection</DropdownMenu.Item>
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
