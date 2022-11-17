export default JSON.stringify([
  {
    name: 'mock_post_order',
    version: 1,
    program: [
      { restriction:  { SenderOwnsAllInputs: {} }},
      { restriction: { SenderHasInputRole: 
        {
          index: 0,
          roleKey: 'Supplier',
        },
      }},
      { op: 'and'},
    ],
  },
  {
    name: 'mock_accept_order',
    version: 1,
    program: [
      { restriction: { SenderOwnsAllInputs: {} }},
      { restriction: { SenderHasInputRole: 
        {
          index: 0,
          roleKey: 'Supplier',
        },
      }},
      { op: 'or'},
    ],
  },
])