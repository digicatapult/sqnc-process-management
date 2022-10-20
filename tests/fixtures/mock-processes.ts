export default [
  {
    name: 'post-order',
    version: 11,
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
  
]
