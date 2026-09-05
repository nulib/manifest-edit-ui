import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import UIDialog from "components/UI/Dialog";
import UIScrollArea from "components/UI/ScrollArea";
import getApiResponse from "lib/getApiResponse";
import { useAppContext } from "context/AppContext";

interface AnnotationCellProps {
  manifestId: string;
  motivation: "note" | "transcription" | "translation";
  resourceId: string;
}

const UITableAnnotationCell: React.FC<AnnotationCellProps> = ({
  manifestId,
  motivation,
  resourceId,
}) => {
  const [refresh, setRefresh] = useState(0);
  const [storedSortKey, setStoredSortKey] = useState<string>();
  const [value, setValue] = useState("");

  const { state } = useAppContext();
  const { authToken } = state;

  // creates sortKey, ex: TRANSCRIPTION#https://resource.uri/id/info.json
  const canonicalSortKey = `${motivation.toUpperCase()}#${resourceId}`;
  const dir = ["translation", "note"].includes(motivation) ? "ltr" : "rtl";

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

      setValue(response?.value || "");
      setStoredSortKey(response?.sortKey);
    })();
  }, [authToken, canonicalSortKey, manifestId, refresh]);

  const handleSaved = () => {
    setRefresh((current) => current + 1);
  };

  return (
    <Flex direction="column" gap="3">
      <Box>
        <UIDialog
          key={storedSortKey || canonicalSortKey}
          defaultValue={value}
          manifestId={manifestId}
          onSaved={handleSaved}
          type={motivation}
          sortKey={storedSortKey || canonicalSortKey}
          method={storedSortKey ? "PUT" : "POST"}
        />
      </Box>
      {value && <UIScrollArea dir={dir} value={value} />}
    </Flex>
  );
};

export default UITableAnnotationCell;
