import { Checkbox, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import getApiResponse from "lib/getApiResponse";
import { useAppContext } from "context/AppContext";

interface HideCellProps {
  manifestId: string;
  resourceId: string;
}

const UITableHideCell: React.FC<HideCellProps> = ({
  manifestId,
  resourceId,
}) => {
  const [hide, setHide] = useState<boolean | undefined>();
  const [method, setMethod] = useState<"POST" | "PUT">("POST");

  const { state } = useAppContext();
  const { authToken } = state;

  const sortKey = `CANVAS#${resourceId}`;

  useEffect(() => {
    console.log(`hide`, hide);
    if (hide === undefined) return;

    setMethod("PUT");
  }, [hide]);

  useEffect(() => {
    (async () => {
      const response = await getApiResponse({
        route: "/item",
        options: {
          method: "POST",
          body: JSON.stringify({
            uri: manifestId,
            sortKey,
          }),
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });

      setHide(response.hide);
    })();
  }, []);

  const onCheckedChange = async (
    checked: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response = await getApiResponse({
      route: "/canvas",
      options: {
        method,
        body: JSON.stringify({
          uri: manifestId,
          sortKey,
          hide: checked,
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    });

    setHide(response.hide);
  };

  return (
    <Text as="label" size="2" aria-label="hidden">
      <Flex gap="2">
        <Checkbox
          checked={hide}
          data-hide={hide}
          onCheckedChange={onCheckedChange}
          size="3"
        />
      </Flex>
    </Text>
  );
};

export default UITableHideCell;
