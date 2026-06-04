import { MailToButton } from "./mailto-button";

export function ContactEventButton({
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
  const subjectParts = [`Inquiry about ${eventTitle}`];
  if (celebrityName) subjectParts.push(celebrityName);

  const celebrityLine = celebrityName
    ? ` I'm especially interested in meeting ${celebrityName}.`
    : "";

  return (
    <MailToButton
      adminEmail={adminEmail}
      subject={subjectParts.join(" · ")}
      bodyTemplate={bodyTemplate}
      replacements={{
        event: eventTitle,
        city: eventCity,
        date: eventDate,
        celebrity: celebrityLine,
      }}
      triggerLabel="Contact us about this event"
      triggerClassName="btn btn-secondary btn-md w-full"
      kicker="Customer care"
      title={`Ask us anything about ${eventTitle}`}
      description="Pop in your email and we'll open your mail app with a draft ready to send. Reply lands in your inbox."
    />
  );
}
