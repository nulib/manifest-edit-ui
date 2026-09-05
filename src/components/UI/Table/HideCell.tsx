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
  const [hide, setHide] = useState(false);
  const [storedSortKey, setStoredSortKey] = useState<string>();

  const { state } = useAppContext();
  const { authToken } = state;

  const canonicalSortKey = `CANVAS#${resourceId}`;

  useEffect(() => {
    (async () => {
      const response = await getApiResponse({
        route: "/item",
        options: {
          method: "POST",
          body: JSON.stringify({
            uri: manifestId,
            sortKey: canonicalSortKey,
          }),
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      });

      if (response) {
        setHide(response.hide === true);
        setStoredSortKey(response.sortKey);
      }
    })();
  }, [authToken, canonicalSortKey, manifestId]);

  const onCheckedChange = async (
    checked: boolean | "indeterminate"
  ) => {
    const response = await getApiResponse({
      route: "/canvas",
      options: {
        method: storedSortKey ? "PUT" : "POST",
        body: JSON.stringify({
          uri: manifestId,
          sortKey: storedSortKey || canonicalSortKey,
          hide: checked === true,
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    });

    if (response) {
      setHide(response.hide === true);
      setStoredSortKey(response.sortKey);
    }
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
