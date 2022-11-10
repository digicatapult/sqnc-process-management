export const validAllRestrictions: Process.Program = [
  { restriction: { None: {} } },
  { op: 'or' },
  { restriction: { SenderOwnsAllInputs: {} }},
  { op: 'and' },
  { restriction: {
    SenderHasInputRole: 
      {
        index: 0,
        roleKey: 'Supplier',
      },
    
  }},
  { op: 'and' },
  { restriction: {
    SenderHasOutputRole: 
      {
        index: 0,
        roleKey: 'Supplier',
      },
    
  }},
  { op: 'and' },
  { restriction: {
    OutputHasRole: 
      {
        index: 0,
        roleKey: 'Supplier',
      },
    
  }},
  { op: 'and' },
  { restriction: {
    MatchInputOutputRole: 
      {
        inputIndex: 0,
        inputRoleKey: 'Supplier',
        outputIndex: 0,
        outputRoleKey: 'Supplier',
      },
    
  }},
  { op: 'and' },
  { restriction: {
    MatchInputOutputMetadataValue: 
      {
        inputIndex: 0,
        inputMetadataKey: 'SomeMetadataKey',
        outputIndex: 0,
        outputMetadataKey: 'SomeMetadataKey',
      },
    
  }},
  { op: 'and' },
  { restriction: {
    FixedNumberOfInputs: 
      {
        numInputs: 0,
      },
    
  },},
  { op: 'and' },
  { restriction: {
    FixedNumberOfOutputs: 
      {
        numOutputs: 0,
      },
    
  },},
  { op: 'and' },
  { restriction: {
    FixedInputMetadataValue: 
      {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValue: {
          Literal: 'a',
        },
      },
    
  },},
  { op: 'and' },
  { restriction: {
    FixedOutputMetadataValue: 
      {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValue: {
          Literal: 'a',
        },
      },
    
  },},
  { op: 'and' },
  { restriction: {
    FixedOutputMetadataValueType: 
      {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      },
    
  },},
]

export const noValidRestrictions: Process.Program = [
  { restriction: { NotARestriction: {} }},
]

export const invalidRestrictionValue: Process.Program = [
  {
    restriction: {
    FixedInputMetadataValue: 
      {
        invalid: 0,
      },
    
  }},
]

export const multiple: string = JSON.stringify([
  {
    name: 'mock_post_order',
    version: 1,
    program: [
      { restriction:  { SenderOwnsAllInputs: {} }},
      { restriction: { SenderHasInputRole: 
        {
          index: 0,
          roleKey: 'Supplier',
        },
      }},
      { op: 'and'},
      { restriction: { FixedOutputMetadataValueType: 
        {
          index: 0,
          metadataKey: 'SomeMetadataKey',
          metadataValueType: 'Literal',
        },
      }}, 
      { restriction: { FixedOutputMetadataValueType: 
        {
          index: 0,
          metadataKey: 'SomeOtherMetadataKey',
          metadataValueType: 'File',
        },
      }},
      { op: 'and'},
      { op: 'and'},
    ],
  },
  {
    name: 'mock_accept_order',
    version: 1,
    program: [
      { restriction: { SenderOwnsAllInputs: {} }},
      { restriction: { SenderHasInputRole: 
        {
          index: 0,
          roleKey: 'Supplier',
        },
      }},
      { op: 'or'},
    ],
  },
])