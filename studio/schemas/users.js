export default {
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'userAddress',
      title: 'Wallet Address',
      type: 'string',
    },
    {
      name: 'userAvatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userContacts',
      title: 'Contacts',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
