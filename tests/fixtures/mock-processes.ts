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
      { restriction: { FixedOutputMetadataValueType: 
        {
          index: 0,
          metadataKey: 'SomeMetadataKey',
          metadataValueType: 'Literal',
        },
      }}, 
      { restriction: { FixedOutputMetadataValueType: 
        {
          index: 0,
          metadataKey: 'SomeOtherMetadataKey',
          metadataValueType: 'File',
        },
      }},
      { op: 'and'},
      { op: 'and'},
    ],
  },
  {
    name: 'mock_accept_order',
    version: 1,
    program: [
      { restriction: { SenderOwnsAllInputs: {} }},
      { op: 'or'},
      { restriction: { SenderHasInputRole: 
        {
          index: 0,
          roleKey: 'Supplier',
        },
      }},
    ],
  },
])