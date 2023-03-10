export const simple: Process.Program = [{ restriction: { None: {} } }]

export const validAllRestrictions: Process.Program = [
  { restriction: { None: {} } },
  { restriction: { SenderOwnsAllInputs: {} } },
  { op: 'Or' },
  {
    restriction: {
      SenderHasInputRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      SenderHasOutputRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      OutputHasRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      MatchInputOutputRole: {
        inputIndex: 0,
        inputRoleKey: 'Supplier',
        outputIndex: 0,
        outputRoleKey: 'Supplier',
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      MatchInputOutputMetadataValue: {
        inputIndex: 0,
        inputMetadataKey: 'SomeMetadataKey',
        outputIndex: 0,
        outputMetadataKey: 'SomeMetadataKey',
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      FixedNumberOfInputs: {
        numInputs: 0,
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      FixedNumberOfOutputs: {
        numOutputs: 0,
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      FixedInputMetadataValue: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValue: {
          Literal: 'a',
        },
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      FixedOutputMetadataValue: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValue: {
          Literal: 'a',
        },
      },
    },
  },
  { op: 'And' },
  {
    restriction: {
      FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      },
    },
  },
  { op: 'And' },
]

export const invalidRestrictionKey: Process.Program = [{ restriction: { NotARestriction: {} } }]

export const invalidRestrictionValue: Process.Program = [
  {
    restriction: {
      FixedInputMetadataValue: {
        invalid: 0,
      },
    },
  },
]

export const multiple = (
  process1Name: string,
  process1BumpedV: number,
  process2Name: string,
  process2BumpedV: number
): string =>
  JSON.stringify([
    {
      name: process1Name,
      version: process1BumpedV,
      program: [
        { restriction: { SenderOwnsAllInputs: {} } },
        {
          restriction: {
            SenderHasInputRole: {
              index: 0,
              roleKey: 'Supplier',
            },
          },
        },
        { op: 'And' },
      ],
    },
    {
      name: process2Name,
      version: process2BumpedV,
      program: [
        { restriction: { SenderOwnsAllInputs: {} } },
        {
          restriction: {
            SenderHasInputRole: {
              index: 0,
              roleKey: 'Supplier',
            },
          },
        },
        { op: 'Or' },
      ],
    },
  ])
