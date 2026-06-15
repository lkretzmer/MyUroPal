export type ReminderType = 'stent' | 'psa';

const pad = (n: number) => n.toString().padStart(2, '0');

// Format date as YYYYMMDD for all-day events
const formatDateAllDay = (date: Date): string => {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
};

const reminderContent: Record<ReminderType, { summary: string; description: string }> = {
  stent: {
    summary: 'Urology: Stent / Nephrostomy Check',
    description:
      'If your ureteric stent or nephrostomy has not yet been removed or exchanged, please contact the hospital urology team.',
  },
  psa: {
    summary: 'Urology: PSA Blood Test Reminder',
    description:
      'Please arrange your PSA (prostate specific antigen) blood test. Contact your GP or hospital urology team if unsure where to attend.',
  },
};

export function buildReminderICS(type: ReminderType, reminderDate: Date): string {
  const { summary, description } = reminderContent[type];

  const start = new Date(reminderDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1); // all-day event spans to next day

  const dtStart = formatDateAllDay(start);
  const dtEnd = formatDateAllDay(end);

  // 24-hour prior alarm
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\n');
}
