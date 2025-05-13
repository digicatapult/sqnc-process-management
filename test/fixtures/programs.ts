export const simple: Process.Program = [{ Restriction: 'None' }]

export const simple2 = [{ Restriction: { SenderHasArgRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } }]

export const invalidPOSIX: Process.Program = [
  { Restriction: 'None' },
  { Restriction: { SenderHasArgRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } },
  { Op: 'Or' },
  { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 0, role_key: 'Supplier' } } },
]

export const validAllRestrictions: Process.Program = [
  { Restriction: 'Fail' },
  { Restriction: 'None' },
  { Op: 'Or' },
  { Restriction: 'SenderIsRoot' },
  { Op: 'Or' },
  { Restriction: { SenderHasArgRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } },
  { Op: 'Or' },
  { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 0, role_key: 'Supplier' } } },
  { Op: 'And' },
  { Restriction: { ArgHasRole: { arg_type: 'Output', index: 0, role_key: 'Supplier' } } },
  { Op: 'And' },
  { Restriction: { ArgHasMetadata: { arg_type: 'Output', index: 0, metadata_key: 'SomeMetadataKey' } } },
  { Op: 'And' },
  { Restriction: { ArgHasRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } },
  { Op: 'And' },
  { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 0, metadata_key: 'SomeMetadataKey' } } },
  { Op: 'And' },
  {
    Restriction: {
      MatchArgsRole: {
        left_arg_type: 'Input',
        left_index: 0,
        left_role_key: 'Supplier',
        right_arg_type: 'Output',
        right_index: 0,
        right_role_key: 'Supplier',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      MatchArgsMetadataValue: {
        left_arg_type: 'Input',
        left_index: 0,
        left_metadata_key: 'SomeMetadataKey',
        right_arg_type: 'Output',
        right_index: 0,
        right_metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      MatchArgIdToMetadataValue: {
        left_arg_type: 'Input',
        left_index: 0,
        right_arg_type: 'Output',
        right_index: 0,
        right_metadata_key: 'SomeMetadataKey',
      },
    },
  },
  { Op: 'And' },
  { Restriction: { FixedArgCount: { arg_type: 'Input', count: 0 } } },
  { Op: 'And' },
  { Restriction: { FixedArgCount: { arg_type: 'Output', count: 0 } } },
  { Op: 'And' },
  {
    Restriction: {
      FixedArgMetadataValue: {
        arg_type: 'Input',
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value: { Literal: 'a' },
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedArgMetadataValue: {
        arg_type: 'Output',
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value: { Literal: 'a' },
      },
    },
  },
  { Op: 'And' },
  {
    Restriction: {
      FixedArgMetadataValueType: {
        arg_type: 'Output',
        index: 0,
        metadata_key: 'SomeMetadataKey',
        metadata_value_type: 'Literal',
      },
    },
  },
  { Op: 'And' },
]

export const invalidRestrictionKey: Process.Program = [{ Restriction: { NotARestriction: {} } }]

export const invalidRestrictionValue: Process.Program = [{ Restriction: { FixedArgMetadataValue: { invalid: 0 } } }]

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
      program: [{ Restriction: { SenderHasArgRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } }],
    },
    {
      name: process2Name,
      version: process2BumpedV,
      program: [{ Restriction: { SenderHasArgRole: { arg_type: 'Input', index: 0, role_key: 'Supplier' } } }],
    },
  ])
