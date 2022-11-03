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

export const validMultipleOfSameRestrictions: Process.Program = [ 
  { restrintion: { FixedInputMetadataValue: 
    {
      index: 0,
      metadataKey: 'key0',
      metadataValue: {
        Literal: 'a',
      },
    },
  }}, 
  { restriction: { FixedInputMetadataValue: 
    {
      index: 0,
      metadataKey: 'key1',
      metadataValue: {
        File: '0x',
      },
    },
  }},
  { op: 'or' },
  { restriction: { FixedInputMetadataValue: 
    {
      index: 0,
      metadataKey: 'key2',
      metadataValue: {
        TokenId: 0,
      },
    },
  }} ,
  { restriction: { FixedInputMetadataValue: 
    {
      index: 0,
      metadataKey: 'key3',
      metadataValue: {
        None: null,
      },
    },
  }},
  { op: 'and' },
  { op: 'or' },
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
