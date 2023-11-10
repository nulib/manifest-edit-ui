import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import UIDialog from "../Dialog";
import UIScrollArea from "../ScrollArea";
import getApiResponse from "../../../lib/getApiResponse";
import { useAppContext } from "../../../context/AppContext";

interface AnnotationCellProps {
  manifestId: string;
  motivation: "transcription" | "translation";
  resourceId: string;
}

const UITableAnnotationCell: React.FC<AnnotationCellProps> = ({
  manifestId,
  motivation,
  resourceId,
}) => {
  const [refresh, setRefresh] = useState(true);
  const [value, setValue] = useState("");

  const { state } = useAppContext();
  const { authToken } = state;

  // creates sortKey, ex: TRANSCRIPTION#https://resource.uri/id/info.json
  const sortKey = `${motivation.toUpperCase()}#${resourceId}`;

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
          headers: { Authorization: `Bearer ${authToken}` },
        },
      });

      if (response?.value) setValue(response.value);

      setRefresh(false);
    })();
  }, [refresh]);

  const handleOnOpenChange = () => {
    setRefresh(true);
  };

  return (
    <Flex direction="column" gap="3">
      <Box>
        <UIDialog
          key={sortKey}
          defaultValue={value}
          manifestId={manifestId}
          onOpenChange={handleOnOpenChange}
          type={motivation}
          resourceId={resourceId}
          method={value ? "PUT" : "POST"}
        />
      </Box>
      {value && <UIScrollArea type={motivation} value={value} />}
    </Flex>
  );
};

export default UITableAnnotationCell;
