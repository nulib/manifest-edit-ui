import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Button,
  Card,
  Dialog,
  Flex,
  Inset,
  Link,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";
import React, { MouseEventHandler } from "react";

import { Canvas } from "@iiif/presentation-3";

interface UITableRowProps {
  canvas: Canvas;
}

const UITableCanvasRow: React.FC<UITableRowProps> = ({ canvas }) => {
  return (
    <TableRow>
      <TableRowHeaderCell>
        <Flex gap="3" align="center">
          <Thumbnail
            thumbnail={canvas.thumbnail}
            style={{
              display: "block",
              objectFit: "cover",
              width: 35,
              height: 35,
              backgroundColor: "var(--gray-5)",
              borderRadius: 3,
            }}
          />

          <Label label={canvas.label} />
        </Flex>
      </TableRowHeaderCell>
      <TableCell>
        <Flex gap="3">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Add Transcript</Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your profile.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Input
                    defaultValue="Freja Johnsen"
                    placeholder="Enter your full name"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Input
                    defaultValue="freja@example.com"
                    placeholder="Enter your email"
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Add Translation</Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your profile.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Input
                    defaultValue="Freja Johnsen"
                    placeholder="Enter your full name"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Input
                    defaultValue="freja@example.com"
                    placeholder="Enter your email"
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default UITableCanvasRow;
