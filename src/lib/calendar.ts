import { wedding } from "@/lib/wedding";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarUrl(type: "wedding" | "reception" = "wedding") {
  const ev = wedding.events.find((e) => e.id === type) ?? wedding.events[0];
  const start = toICSDate(ev.dateISO);
  const end = toICSDate(ev.endISO);
  const title = `${wedding.bride.name} & ${wedding.groom.name} — ${ev.title}`;
  const details = `${wedding.parentsInvite.message}.\n\nWith love & blessings, Baji Sheik & Jareena Sheik invite you to celebrate the marriage of their only son ${wedding.groom.fullName} with ${wedding.bride.fullName}.\n\nEvent: ${ev.title}\nDate: ${ev.dateLabel}\nTime: ${ev.timeLabel}\nVenue: ${ev.venueName}\nDirections: ${ev.mapsUrl}`;
  const location = `${ev.venueName}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function openGoogleCalendar(type: "wedding" | "reception" = "wedding") {
  if (typeof window !== "undefined") {
    window.open(getGoogleCalendarUrl(type), "_blank", "noopener,noreferrer");
  }
}

/** Builds and downloads an .ics file for the wedding or reception. */
export function downloadInvite(type: "wedding" | "reception" = "wedding") {
  const ev = wedding.events.find((e) => e.id === type) ?? wedding.events[0];
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-${ev.id}`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(ev.dateISO)}`,
    `DTEND:${toICSDate(ev.endISO)}`,
    `SUMMARY:${wedding.bride.name} & ${wedding.groom.name} — ${ev.title}`,
    `LOCATION:${ev.venueName}`,
    `DESCRIPTION:${wedding.parentsInvite.message}. With love and joy, celebrate the wedding of ${wedding.groom.fullName} and ${wedding.bride.fullName}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}-invitation.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
