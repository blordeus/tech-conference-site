export default {
  name: 'conference',
  title: 'Conference',
  type: 'document',
  // Singleton — only one conference document
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'brandCode',
      title: 'Brand Code',
      type: 'string',
      description: 'e.g. DEVHORIZON_26',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'cityAbbreviation',
      title: 'City Abbreviation',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' }
  }
}
