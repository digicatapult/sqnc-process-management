export const restrictionsBeforeMap = JSON.stringify({
  SenderOwnsAllInputs: [],
  SenderHasInputRole: [
    {
      index: 0,
      roleKey: 'Supplier',
    },
  ],
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
  ],
})

export const restrictionsAfterMap = [
  { SenderOwnsAllInputs: {} },
  {
    SenderHasInputRole: {
      index: 0,
      roleKey: 'Supplier',
    },
  },
  {
    FixedOutputMetadataValueType: {
      index: 0,
      metadataKey: 'SomeMetadataKey',
      metadataValueType: 'Literal',
    },
  },
  {
    FixedOutputMetadataValueType: {
      index: 0,
      metadataKey: 'SomeOtherMetadataKey',
      metadataValueType: 'File',
    },
  },
]
