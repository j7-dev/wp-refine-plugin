export const wpResources = [
  {
    name: 'posts',
    list: '/posts',
    create: '/posts',
    edit: '/posts/:id',
    show: '/posts/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    name: 'media',
    list: '/media',
    create: '/media',
    edit: '/media/:id',
    show: '/media/:id',
    meta: {
      canDelete: true,
    },
  },
]
