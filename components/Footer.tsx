const Footer = () => {
  return (
    <footer className="border-t py-6">
      <p className="text-center text-sm leading-loose text-muted-foreground">
        Built by Jonathan Rampersad. The source code is available on{' '}
        <a
          href="https://github.com/jono-rams/polysolve-website"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;