import { Highlight, themes, type Language } from 'prism-react-renderer';

type CodeBlockProps = {
  children: React.ReactNode;
  language?: Language;
};

const CodeBlock = ({ children, language = "plaintext" }: CodeBlockProps) => {
  if (typeof children !== 'string') {
    return null; 
  }

  const code = children.trim();

  return (
    <Highlight
      theme={themes.vsDark}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={`${className} font-mono text-sm p-4 rounded-md my-4 overflow-x-auto`}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;