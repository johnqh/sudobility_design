import React from "react";
import { CodeBlock as BaseCodeBlock } from "@sudobility/components";

interface CodeBlockProps {
  filename: string;
  title?: string;
  className?: string;
}

/**
 * Mail Box specific CodeBlock component
 * This is a thin wrapper around the base CodeBlock from mail_box_components
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  filename,
  title,
  className = "",
}) => {
  return (
    <BaseCodeBlock filename={filename} title={title} className={className} />
  );
};

export default CodeBlock;
