import Link from "next/link";

const NotFound = () => {
  return (
    <main className="page-wrap flex min-h-[90dvh] flex-col items-center justify-center px-4">
      <section className="island-shell mb-8 flex flex-col items-center gap-2 rounded-2xl py-6 sm:p-8 md:px-6">
        <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          Page not found
        </h1>
        <Link
          href="/"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background no-underline transition"
        >
          Go home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
