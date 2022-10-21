export default [
  {
    name: 'mock_post_order',
    version: 6,
    rawRestrictions: JSON.stringify([
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
    ]),
  },
  {
    name: 'mock_accept_order',
    version: 6,
    rawRestrictions: JSON.stringify([
      { SenderOwnsAllInputs: [] },
      { op: 'or'},
      { SenderHasInputRole: [
        {
          index: 0,
          roleKey: 'Supplier',
        },
      ]},
    ]),
  },
]
