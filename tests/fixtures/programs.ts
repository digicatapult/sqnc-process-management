export const simple: Process.Program = [{ restriction: { None: {} } }]

export const validAllRestrictions: Process.Program = [
  { restriction: { None: {} } },
  { restriction: { SenderOwnsAllInputs: {} } },
  { op: 'or' },
  {
    restriction: {
      SenderHasInputRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'and' },
  {
    restriction: {
      SenderHasOutputRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'and' },
  {
    restriction: {
      OutputHasRole: {
        index: 0,
        roleKey: 'Supplier',
      },
    },
  },
  { op: 'and' },
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
  { op: 'and' },
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
  { op: 'and' },
  {
    restriction: {
      FixedNumberOfInputs: {
        numInputs: 0,
      },
    },
  },
  { op: 'and' },
  {
    restriction: {
      FixedNumberOfOutputs: {
        numOutputs: 0,
      },
    },
  },
  { op: 'and' },
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
  { op: 'and' },
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
  { op: 'and' },
  {
    restriction: {
      FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      },
    },
  },
  { op: 'and' },
]

export const noValidRestrictions: Process.Program = [{ restriction: { NotARestriction: {} } }]

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
        { op: 'and' },
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
        { op: 'or' },
      ],
    },
  ])
