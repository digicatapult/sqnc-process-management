export default [
  {
    name: 'test-program-create',
    version: 1,
    program: [
      { Restriction: { FixedArgCount: { arg_type: 'Input', count: 0 } } },
      { Restriction: { FixedArgCount: { arg_type: 'Output', count: 1 } } },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'type',
            metadata_value: { Literal: 'DEMAND' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'state',
            metadata_value: { Literal: 'created' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValueType: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'parameters',
            metadata_value_type: 'File',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_a' },
          },
        },
      },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_b' },
          },
        },
      },
      { Op: 'Or' },
      { Op: 'And' },
      { Restriction: { ArgHasMetadata: { arg_type: 'Output', index: 0, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      { Op: 'And' },
      { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 0, role_key: 'Owner' } } },
      { Op: 'And' },
    ],
  },
  {
    name: 'test-program-propose',
    version: 1,
    program: [
      { Restriction: { FixedArgCount: { arg_type: 'Input', count: 2 } } },
      { Restriction: { FixedArgCount: { arg_type: 'Output', count: 3 } } },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'type',
            metadata_value: { Literal: 'DEMAND' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_a' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'state',
            metadata_value: { Literal: 'created' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'type',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'type',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'version',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'version',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'subtype',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'subtype',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'state',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'state',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 0,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 0,
            right_role_key: 'Owner',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 0, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'type',
            metadata_value: { Literal: 'DEMAND' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_b' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'state',
            metadata_value: { Literal: 'created' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'type',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'type',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'version',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'version',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'subtype',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'subtype',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'state',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'state',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 1,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 1,
            right_role_key: 'Owner',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 1, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 2, role_key: 'Optimiser' } } },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 0,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 2,
            right_role_key: 'MemberA',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 1,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 2,
            right_role_key: 'MemberB',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 2,
            metadata_key: 'type',
            metadata_value: { Literal: 'MATCH2' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 2,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 2,
            metadata_key: 'state',
            metadata_value: { Literal: 'proposed' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandA',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 0, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandA',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandB',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 1, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandB',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      { Restriction: { ArgHasMetadata: { arg_type: 'Output', index: 2, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      { Op: 'And' },
    ],
  },
  {
    name: 'test-program-strings-and-numbers',
    version: 1,
    program: [
      { Restriction: { FixedArgCount: { arg_type: 'Input', count: 3 } } },
      { Restriction: { FixedArgCount: { arg_type: 'Output', count: 3 } } },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 0,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 0,
            right_role_key: 'Owner',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'type',
            metadata_value: { Literal: 'DEMAND' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'type',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'type',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_a' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'subtype',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'subtype',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'version',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'version',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 0, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            right_arg_type: 'Output',
            right_index: 0,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 0,
            metadata_key: 'state',
            metadata_value: { Literal: 'created' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 0,
            metadata_key: 'state',
            metadata_value: { Literal: 'allocated' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 1,
            left_role_key: 'Owner',
            right_arg_type: 'Output',
            right_index: 1,
            right_role_key: 'Owner',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'type',
            metadata_value: { Literal: 'DEMAND' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'type',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'type',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'subtype',
            metadata_value: { Literal: 'demand_b' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'subtype',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'subtype',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'version',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'version',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 1, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            right_arg_type: 'Output',
            right_index: 1,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 1,
            metadata_key: 'state',
            metadata_value: { Literal: 'created' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 1,
            metadata_key: 'state',
            metadata_value: { Literal: 'allocated' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 2,
            left_role_key: 'Optimiser',
            right_arg_type: 'Output',
            right_index: 2,
            right_role_key: 'Optimiser',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 2,
            left_role_key: 'MemberA',
            right_arg_type: 'Output',
            right_index: 2,
            right_role_key: 'MemberA',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsRole: {
            left_arg_type: 'Input',
            left_index: 2,
            left_role_key: 'MemberB',
            right_arg_type: 'Output',
            right_index: 2,
            right_role_key: 'MemberB',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 2,
            metadata_key: 'type',
            metadata_value: { Literal: 'MATCH2' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            left_metadata_key: 'type',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'type',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 2,
            metadata_key: 'version',
            metadata_value: { Literal: '1' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            left_metadata_key: 'version',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'version',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 0,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandA',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            left_metadata_key: 'demandA',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandA',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 1,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandB',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            left_metadata_key: 'demandB',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'demandB',
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          MatchArgsMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            left_metadata_key: 'originalId',
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Restriction: { ArgHasMetadata: { arg_type: 'Input', index: 2, metadata_key: 'originalId' } } },
      { Restriction: 'None' },
      { Op: 'NotL' },
      {
        Restriction: {
          MatchArgIdToMetadataValue: {
            left_arg_type: 'Input',
            left_index: 2,
            right_arg_type: 'Output',
            right_index: 2,
            right_metadata_key: 'originalId',
          },
        },
      },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Output',
            index: 2,
            metadata_key: 'state',
            metadata_value: { Literal: 'acceptedFinal' },
          },
        },
      },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 2,
            metadata_key: 'state',
            metadata_value: { Literal: 'acceptedA' },
          },
        },
      },
      { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 2, role_key: 'MemberB' } } },
      { Op: 'And' },
      {
        Restriction: {
          FixedArgMetadataValue: {
            arg_type: 'Input',
            index: 2,
            metadata_key: 'state',
            metadata_value: { Literal: 'acceptedB' },
          },
        },
      },
      { Restriction: { SenderHasArgRole: { arg_type: 'Output', index: 2, role_key: 'MemberA' } } },
      { Op: 'And' },
      { Op: 'Or' },
      { Op: 'And' },
    ],
  },
]
