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
      name: 'userMessage',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'userVerify',
      title: 'Verify',
      type: 'boolean',
      initialValue: false,
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
    {
      name: 'userTransactions',
      title: 'Transactions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'transaction',
          fields: [
            {type: 'string', name: 'receiver'},
            {type: 'string', name: 'from'},
            {type: 'string', name: 'message'},
            {type: 'string', name: 'status'},
            {type: 'string', name: 'date'},
            {type: 'string', name: 'amount'},
          ],
        },
      ],
    },
  ],
}
