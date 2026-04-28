import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/close-account")({
  component: CloseAccount,
});

function CloseAccount() {
  return (
    <main className="page-wrap px-4 min-h-[90dvh] flex flex-col items-start justify-center">
      <section className="island-shell mb-8 rounded-2xl md:px-6 py-6 sm:p-8">
        <p className="island-kicker mb-2">Account Management</p>
        <h1 className="text-foreground mb-3 text-4xl font-bold sm:text-5xl">
          Closing your account
        </h1>
        <p className="text-muted-foreground m-0 max-w-3xl text-base leading-8">
          We're sorry to see you go. Closing your account is a permanent action
          and cannot be undone. Please ensure you have backed up any information
          you wish to keep.
        </p>
      </section>

      <section className="island-shell rounded-2xl md:px-6 py-6 sm:p-8">
        <h2 className="text-foreground mb-4 text-2xl font-bold">
          What happens next?
        </h2>
        <ul className="text-muted-foreground flex flex-col gap-4 text-base leading-7">
          <li>
            <strong className="text-foreground">Data Removal:</strong> Your
            profile, portfolio data, and uploaded screenshots will be
            permanently deleted from our active databases.
          </li>
          <li>
            <strong className="text-foreground">Profile Visibility:</strong>{" "}
            Your public portfolio URL will no longer be accessible.
          </li>
          <li>
            <strong className="text-foreground">Third-Party Auth:</strong> Your
            connection to Google or GitHub will be severed within our platform.
          </li>
        </ul>
        <div className="mt-10 border-t border-border pt-8">
          <p className="text-muted-foreground mb-6 text-sm">
            To proceed with account deletion, please use the settings menu
            within the Portfolyo mobile app.
          </p>
        </div>
      </section>
    </main>
  );
}
