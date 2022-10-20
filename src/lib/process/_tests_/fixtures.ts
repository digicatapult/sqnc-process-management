export const restrictionsBeforeMap = JSON.stringify([
  { SenderOwnsAllInputs: [] },
  {
    SenderHasInputRole: [
      {
        index: 0,
        roleKey: 'Supplier',
      },
    ]
  },
  { op: 'and' },
  {
    FixedOutputMetadataValueType: [
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
    ]
  },
  { op: 'and' },
  { op: 'and' },
])

export const restrictionsAfterMap = [
  { restriction: { SenderOwnsAllInputs: {} } },
  {
    restriction: {
      SenderHasInputRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    }
  },
  { op: 'and' },
  {
    restriction: {
      FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      },
    }
  },
  {
    restriction: {
      FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeOtherMetadataKey',
        metadataValueType: 'File',
      },
    }
  },
  { op: 'and' },
  { op: 'and' },
]
