export const validAllRestrictions = JSON.stringify({
  None: [],
  SenderOwnsAllInputs: [],
  SenderHasInputRole: [
    {
      index: 0,
      roleKey: 'Supplier',
    },
  ],
  SenderHasOutputRole: [
    {
      index: 0,
      roleKey: 'Supplier',
    },
  ],
  OutputHasRole: [
    {
      index: 0,
      roleKey: 'Supplier',
    },
  ],
  MatchInputOutputRole: [
    {
      inputIndex: 0,
      inputRoleKey: 'Supplier',
      outputIndex: 0,
      outputRoleKey: 'Supplier',
    },
  ],
  MatchInputOutputMetadataValue: [
    {
      inputIndex: 0,
      inputMetadataKey: 'SomeMetadataKey',
      outputIndex: 0,
      outputMetadataKey: 'SomeMetadataKey',
    },
  ],
  FixedNumberOfInputs: [
    {
      numInputs: 0,
    },
  ],
  FixedNumberOfOutputs: [
    {
      numOutputs: 0,
    },
  ],
  FixedInputMetadataValue: [
    {
      index: 0,
      metadataKey: 'SomeMetadataKey',
      metadataValue: {
        Literal: 'a',
      },
    },
  ],
  FixedOutputMetadataValue: [
    {
      index: 0,
      metadataKey: 'SomeMetadataKey',
      metadataValue: {
        Literal: 'a',
      },
    },
  ],
  FixedOutputMetadataValueType: [
    {
      index: 0,
      metadataKey: 'SomeMetadataKey',
      metadataValueType: 'Literal',
    },
  ],
})

export const validMultipleOfSameRestrictions = JSON.stringify({
  FixedInputMetadataValue: [
    {
      index: 0,
      metadataKey: 'key0',
      metadataValue: {
        Literal: 'a',
      },
    },
    {
      index: 0,
      metadataKey: 'key1',
      metadataValue: {
        File: '0x',
      },
    },
    {
      index: 0,
      metadataKey: 'key2',
      metadataValue: {
        TokenId: 0,
      },
    },
    {
      index: 0,
      metadataKey: 'key3',
      metadataValue: {
        None: null,
      },
    },
  ],
})

export const noValidRestrictions = JSON.stringify({
  NotARestriction: [],
})

export const invalidRestrictionValue = JSON.stringify({
  FixedInputMetadataValue: [
    {
      invalid: 0,
    },
  ],
})
