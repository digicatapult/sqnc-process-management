export default JSON.stringify([
  {
    name: 'mock_post_order',
    version: 1,
    rawRestrictions: [
      { SenderOwnsAllInputs: [] },
      { SenderHasInputRole: [
        {
          index: 0,
          roleKey: 'Supplier',
        },
      ]},
      { op: 'and'},
      { FixedOutputMetadataValueType: [
        {
          index: 0,
          metadataKey: 'SomeMetadataKey',
          metadataValueType: 'Literal',
        },
        {
          index: 0,
          metadataKey: 'SomeOtherMetadataKey',
          metadataValueType: 'File',
        },
      ]},
      { op: 'and'},
      { op: 'and'},
    ],
  },
  {
    name: 'mock_accept_order',
    version: 1,
    rawRestrictions: [
      { SenderOwnsAllInputs: [] },
      { op: 'or'},
      { SenderHasInputRole: [
        {
          index: 0,
          roleKey: 'Supplier',
        },
      ]},
    ],
  },
])