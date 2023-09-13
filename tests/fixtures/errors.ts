export default {
  restriction_value: [
    {
      code: 'invalid_union',
      unionErrors: [
        {
          issues: [
            {
              expected:
                "'Identity' | 'TransferL' | 'TransferR' | 'NotL' | 'NotR' | 'And' | 'Nand' | 'Or' | 'Nor' | 'Xor' | 'Xnor' | 'ImplicationL' | 'ImplicationR' | 'InhibitionL' | 'InhibitionR'",
              received: 'undefined',
              code: 'invalid_type',
              path: ['program', 0, 'op'],
              message: 'Required',
            },
          ],
          name: 'ZodError',
        },
        {
          issues: [
            {
              code: 'invalid_union',
              unionErrors: [
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'None'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'SenderHasInputRole'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'SenderHasOutputRole'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'OutputHasRole'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'OutputHasMetadata'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'InputHasRole'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'InputHasMetadata'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'MatchInputOutputRole'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'MatchInputOutputMetadataValue'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'MatchInputIdOutputMetadataValue'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedNumberOfInputs'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedNumberOfOutputs'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'number',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'index'],
                      message: 'Required',
                    },
                    {
                      code: 'invalid_type',
                      expected: 'string',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataKey'],
                      message: 'Required',
                    },
                    {
                      code: 'invalid_union',
                      unionErrors: [
                        {
                          issues: [
                            {
                              code: 'invalid_type',
                              expected: 'object',
                              received: 'undefined',
                              path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataValue'],
                              message: 'Required',
                            },
                          ],
                          name: 'ZodError',
                        },
                        {
                          issues: [
                            {
                              code: 'invalid_type',
                              expected: 'object',
                              received: 'undefined',
                              path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataValue'],
                              message: 'Required',
                            },
                          ],
                          name: 'ZodError',
                        },
                        {
                          issues: [
                            {
                              code: 'invalid_type',
                              expected: 'object',
                              received: 'undefined',
                              path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataValue'],
                              message: 'Required',
                            },
                          ],
                          name: 'ZodError',
                        },
                        {
                          issues: [
                            {
                              code: 'invalid_type',
                              expected: 'object',
                              received: 'undefined',
                              path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataValue'],
                              message: 'Required',
                            },
                          ],
                          name: 'ZodError',
                        },
                      ],
                      path: ['program', 0, 'restriction', 'FixedInputMetadataValue', 'metadataValue'],
                      message: 'Invalid input',
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedOutputMetadataValue'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
                {
                  issues: [
                    {
                      code: 'invalid_type',
                      expected: 'object',
                      received: 'undefined',
                      path: ['program', 0, 'restriction', 'FixedOutputMetadataValueType'],
                      message: 'Required',
                    },
                    {
                      code: 'unrecognized_keys',
                      keys: ['FixedInputMetadataValue'],
                      path: ['program', 0, 'restriction'],
                      message: "Unrecognized key(s) in object: 'FixedInputMetadataValue'",
                    },
                  ],
                  name: 'ZodError',
                },
              ],
              path: ['program', 0, 'restriction'],
              message: 'Invalid input',
            },
          ],
          name: 'ZodError',
        },
      ],
      path: ['program', 0],
      message: 'Invalid input',
    },
  ],
}
