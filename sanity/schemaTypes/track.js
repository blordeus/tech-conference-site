export default {
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    {
      name: 'trackId',
      title: 'Track ID',
      type: 'string',
      description: 'Original ID from data.json (e.g. tr_0)',
      validation: (R) => R.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color (e.g. #B5E9FC)'
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'trackId' }
  }
}
