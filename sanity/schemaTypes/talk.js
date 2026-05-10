export default {
  name: 'talk',
  title: 'Talk',
  type: 'document',
  fields: [
    {
      name: 'talkId',
      title: 'Talk ID',
      type: 'string',
      description: 'Original ID from data.json (e.g. tk_0)',
      validation: (R) => R.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'speaker' }],
      validation: (R) => R.required(),
    },
    {
      name: 'track',
      title: 'Track',
      type: 'reference',
      to: [{ type: 'track' }],
    },
    {
      name: 'day',
      title: 'Day',
      type: 'number',
      description: '1, 2, or 3',
      validation: (R) => R.required().min(1).max(3),
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: '24h format (e.g. 9:00)',
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: '24h format (e.g. 10:00)',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      description: 'Show in schedule highlights on home page',
      initialValue: false,
    },
  },
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker.name',
      day: 'day',
    },
    prepare({ title, speaker, day }) {
      return {
        title,
        subtitle: `Day ${day} — ${speaker ?? 'No speaker'}`,
      };
    },
  },
}
