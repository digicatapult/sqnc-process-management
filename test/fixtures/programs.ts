export const simple: Process.Program = [{ Restriction: 'None' }]

export const simple2 = [
  {
    Restriction: {
      SenderHasInputRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
]

export const invalidPOSIX: Process.Program = [
  { Restriction: 'None' },
  {
    Restriction: {
      SenderHasInputRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
  { Op: 'Or' },
  {
    Restriction: {
      SenderHasOutputRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
]

export const validAllRestrictions: Process.Program = [
  { Restriction: 'None' },
  {
    Restriction: {
      SenderHasInputRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
  { Op: 'Or' },
  {
    Restriction: {
      SenderHasOutputRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      OutputHasRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      OutputHasMetadata: {
        index: 0,
        metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      InputHasRole: {
        index: 0,
        role_key: 'Supplier',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      InputHasMetadata: {
        index: 0,
        metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      MatchInputOutputRole: {
        input_index: 0,
        input_role_key: 'Supplier',
        output_index: 0,
        output_role_key: 'Supplier',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      MatchInputOutputMetadataValue: {
        input_index: 0,
        input_metadata_key: 'SomeMetadataKey',
        output_index: 0,
        output_metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      MatchInputIdOutputMetadataValue: {
        input_index: 0,
        output_index: 0,
        output_metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedNumberOfInputs: {
        num_inputs: 0,
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedNumberOfOutputs: {
        num_outputs: 0,
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedInputMetadataValue: {
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value: {
          Literal: 'a',
        },
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedOutputMetadataValue: {
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value: {
          Literal: 'a',
        },
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedOutputMetadataValueType: {
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value_type: 'Literal',
      },
    },
  },
  { Op: 'And' },
]

export const invalidRestrictionKey: Process.Program = [{ Restriction: { NotARestriction: {} } }]

export const invalidRestrictionValue: Process.Program = [
  {
    Restriction: {
      FixedInputMetadataValue: {
        invalid: 0,
      },
    },
  },
]

// WHY not to use simple/etc? why not name1 name2?
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
        {
          Restriction: {
            SenderHasInputRole: {
              index: 0,
              role_key: 'Supplier',
            },
          },
        },
      ],
    },
    {
      name: process2Name,
      version: process2BumpedV,
      program: [
        {
          Restriction: {
            SenderHasInputRole: {
              index: 0,
              role_key: 'Supplier',
            },
          },
        },
      ],
    },
  ])
