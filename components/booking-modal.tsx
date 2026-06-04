import { MailToButton } from "./mailto-button";

/**
 * "Book now" button that opens an email-capture modal — same UX as the
 * contact button, but the pre-written body is about reserving a ticket.
 */
export function BookingButton({
  adminEmail,
  bodyTemplate,
  eventTitle,
  eventCity,
  eventDate,
  celebrityName,
}: {
  adminEmail: string;
  bodyTemplate: string;
  eventTitle: string;
  eventCity: string;
  eventDate: string;
  celebrityName: string | null;
}) {
  const celebrityLine = celebrityName
    ? ` I'm especially interested in meeting ${celebrityName}.`
    : "";

  return (
    <MailToButton
      adminEmail={adminEmail}
      subject={`Booking inquiry · ${eventTitle}`}
      bodyTemplate={bodyTemplate}
      replacements={{
        event: eventTitle,
        city: eventCity,
        date: eventDate,
        celebrity: celebrityLine,
      }}
      triggerLabel="Book now →"
      triggerClassName="btn btn-primary btn-lg w-full"
      kicker="Book your spot"
      title={`Reserve a ticket for ${eventTitle}`}
      description="Drop in your email and we'll open your mail app with a ticket-inquiry draft ready to send. We'll reply with availability, pricing, and next steps."
    />
  );
}
