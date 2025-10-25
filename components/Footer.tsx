import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t py-8 text-center text-muted-foreground">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
        <a
          href="https://github.com/jono-rams/polysolve"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          Package GitHub
        </a>
        <a
          href="https://pypi.org/project/polysolve/"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          PyPI
        </a>
        <Link
          href="/docs"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          Documentation
        </Link>
        <a
          href="https://github.com/jono-rams/polysolve-website"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          Website Source
        </a>
      </div>
      
      <p className="text-sm leading-loose">
        Released under the MIT License.
      </p>
      <p className="text-sm leading-loose">
        © {new Date().getFullYear()} Jonathan Rampersad.
      </p>
    </footer>
  );
};

export default Footer;