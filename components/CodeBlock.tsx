const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-secondary p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words my-4">
    <code className="font-mono text-sm">{children}</code>
  </pre>
);

export default CodeBlock;