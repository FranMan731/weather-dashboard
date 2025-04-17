import React from "react";
import { TextInputBase } from "./TextInputBase";
interface TextInputStandardProps
  extends React.ComponentProps<typeof TextInputBase> {}

export const TextInputStandard: React.FC<TextInputStandardProps> = (props) => {
  return <TextInputBase {...props} />;
};
