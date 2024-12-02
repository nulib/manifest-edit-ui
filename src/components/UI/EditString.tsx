import { Flex, Link, Text, TextField, TextProps } from "@radix-ui/themes";
import { useRef, useState } from "react";

import { InternationalString } from "@iiif/presentation-3";
import { ManifestEditorManifest } from "types/manifest-editor";
import { getLabelAsString } from "lib/iiif-helpers";

const UIEditString = ({
  attribute,
  metadata,
  onSave,
  originalValue,
  textProps,
}: {
  attribute: "label" | "summary" | "provider";
  metadata: ManifestEditorManifest;
  onSave: (metadata: ManifestEditorManifest) => void;
  originalValue?: InternationalString;
  textProps?: TextProps;
}) => {
  const value = metadata[attribute]
    ? metadata[attribute]
    : getLabelAsString(originalValue);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIsEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave({ ...metadata, [attribute]: inputValue });
  };

  return (
    <Flex align="center" gap="2" width="100%" data-testid="ui-edit-string">
      {isEditing ? (
        <>
          <TextField.Root
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
            style={{ flexGrow: 1 }}
          ></TextField.Root>
          <Link href="#" onClick={handleSave} size="1">
            Save
          </Link>
          <Link href="#" color="crimson" onClick={handleCancel} size="1">
            Cancel
          </Link>
        </>
      ) : (
        <>
          <Text {...textProps} color={!value ? "gray" : undefined}>
            {value ? value : "None"}
          </Text>
          <Link href="#" onClick={handleIsEditing} size="1">
            Edit
          </Link>
        </>
      )}
    </Flex>
  );
};

export default UIEditString;
