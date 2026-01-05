// components/DynamicCode.tsx (use client)
"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DynamicCode = ({
    language,
    children,
}: {
    language: string;
    children: string;
}) => {
    return (
        <SyntaxHighlighter language={language} style={oneDark}>
            {children}
        </SyntaxHighlighter>
    );
};

export default DynamicCode;