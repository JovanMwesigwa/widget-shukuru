import { Callout } from "@radix-ui/themes";
import React from "react";

const TooltipComponent = ({
  tipType = "red",
  message,
}: {
  tipType: "red" | "green";
  message: string;
}) => {
  return (
    <Callout.Root color={tipType} mb="4">
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export default TooltipComponent;
