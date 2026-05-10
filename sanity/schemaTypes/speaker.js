export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'speakerId',
      title: 'Speaker ID',
      type: 'string',
      description: 'Original ID from data.json (e.g. sp_0)',
      validation: (R) => R.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on home page featured speakers section',
      initialValue: false,
    },
  },
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar',
    },
  },
}
