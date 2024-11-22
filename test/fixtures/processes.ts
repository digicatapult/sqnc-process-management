export default [
    {
      "name": "test-program-create",
      "version": 1,
      "program": [
        {
          "Restriction": {
            "FixedNumberOfInputs": {
              "num_inputs": 0
            }
          }
        },
        {
          "Restriction": {
            "FixedNumberOfOutputs": {
              "num_outputs": 1
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "created"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValueType": {
              "index": 0,
              "metadata_key": "parameters",
              "metadata_value_type": "File"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_a"
              }
            }
          }
        },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "OutputHasMetadata": {
              "index": 0,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        { "Op": "And" },
        {
          "Restriction": {
            "SenderHasOutputRole": {
              "index": 0,
              "role_key": "Owner"
            }
          }
        },
        { "Op": "And" }
      ]
    },
    {
      "name": "test-program-propose",
      "version": 1,
      "program": [
        {
          "Restriction": {
            "FixedNumberOfInputs": {
              "num_inputs": 2
            }
          }
        },
        {
          "Restriction": {
            "FixedNumberOfOutputs": {
              "num_outputs": 3
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_a"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "created"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "type",
              "output_index": 0,
              "output_metadata_key": "type"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "version",
              "output_index": 0,
              "output_metadata_key": "version"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "subtype",
              "output_index": 0,
              "output_metadata_key": "subtype"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "state",
              "output_index": 0,
              "output_metadata_key": "state"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 0,
              "input_role_key": "Owner",
              "output_index": 0,
              "output_role_key": "Owner"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "originalId",
              "output_index": 0,
              "output_metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 0,
              "output_index": 0,
              "output_metadata_key": "originalId"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "created"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "type",
              "output_index": 1,
              "output_metadata_key": "type"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "version",
              "output_index": 1,
              "output_metadata_key": "version"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "subtype",
              "output_index": 1,
              "output_metadata_key": "subtype"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "state",
              "output_index": 1,
              "output_metadata_key": "state"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 1,
              "input_role_key": "Owner",
              "output_index": 1,
              "output_role_key": "Owner"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "originalId",
              "output_index": 1,
              "output_metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 1,
              "output_index": 1,
              "output_metadata_key": "originalId"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "role_key": "Optimiser"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 0,
              "input_role_key": "Owner",
              "output_index": 2,
              "output_role_key": "MemberA"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 1,
              "input_role_key": "Owner",
              "output_index": 2,
              "output_role_key": "MemberB"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "MATCH2"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "proposed"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "originalId",
              "output_index": 2,
              "output_metadata_key": "demandA"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 0,
              "output_index": 2,
              "output_metadata_key": "demandA"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "originalId",
              "output_index": 2,
              "output_metadata_key": "demandB"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 1,
              "output_index": 2,
              "output_metadata_key": "demandB"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "OutputHasMetadata": {
              "index": 2,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        { "Op": "And" }
      ]
    },
    {
      "name": "test-program-strings-and-numbers",
      "version": 1,
      "program": [
        {
          "Restriction": {
            "FixedNumberOfInputs": {
              "num_inputs": 3
            }
          }
        },
        {
          "Restriction": {
            "FixedNumberOfOutputs": {
              "num_outputs": 3
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 0,
              "input_role_key": "Owner",
              "output_index": 0,
              "output_role_key": "Owner"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "type",
              "output_index": 0,
              "output_metadata_key": "type"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_a"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "subtype",
              "output_index": 0,
              "output_metadata_key": "subtype"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "version",
              "output_index": 0,
              "output_metadata_key": "version"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "originalId",
              "output_index": 0,
              "output_metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 0,
              "output_index": 0,
              "output_metadata_key": "originalId"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "created"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "allocated"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 1,
              "input_role_key": "Owner",
              "output_index": 1,
              "output_role_key": "Owner"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "type",
              "output_index": 1,
              "output_metadata_key": "type"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "subtype",
              "metadata_value": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "subtype",
              "output_index": 1,
              "output_metadata_key": "subtype"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "version",
              "output_index": 1,
              "output_metadata_key": "version"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "originalId",
              "output_index": 1,
              "output_metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 1,
              "output_index": 1,
              "output_metadata_key": "originalId"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "created"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 1,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "allocated"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 2,
              "input_role_key": "Optimiser",
              "output_index": 2,
              "output_role_key": "Optimiser"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 2,
              "input_role_key": "MemberA",
              "output_index": 2,
              "output_role_key": "MemberA"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputRole": {
              "input_index": 2,
              "input_role_key": "MemberB",
              "output_index": 2,
              "output_role_key": "MemberB"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadata_key": "type",
              "metadata_value": {
                "Literal": "MATCH2"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 2,
              "input_metadata_key": "type",
              "output_index": 2,
              "output_metadata_key": "type"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadata_key": "version",
              "metadata_value": {
                "Literal": "1"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 2,
              "input_metadata_key": "version",
              "output_index": 2,
              "output_metadata_key": "version"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 0,
              "input_metadata_key": "originalId",
              "output_index": 2,
              "output_metadata_key": "demandA"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 2,
              "input_metadata_key": "demandA",
              "output_index": 2,
              "output_metadata_key": "demandA"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 1,
              "input_metadata_key": "originalId",
              "output_index": 2,
              "output_metadata_key": "demandB"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 2,
              "input_metadata_key": "demandB",
              "output_index": 2,
              "output_metadata_key": "demandB"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "MatchInputOutputMetadataValue": {
              "input_index": 2,
              "input_metadata_key": "originalId",
              "output_index": 2,
              "output_metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": {
            "InputHasMetadata": {
              "index": 2,
              "metadata_key": "originalId"
            }
          }
        },
        {
          "Restriction": "None"
        },
        { "Op": "NotL" },
        {
          "Restriction": {
            "MatchInputIdOutputMetadataValue": {
              "input_index": 2,
              "output_index": 2,
              "output_metadata_key": "originalId"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "acceptedFinal"
              }
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "acceptedA"
              }
            }
          }
        },
        {
          "Restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "role_key": "MemberB"
            }
          }
        },
        { "Op": "And" },
        {
          "Restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadata_key": "state",
              "metadata_value": {
                "Literal": "acceptedB"
              }
            }
          }
        },
        {
          "Restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "role_key": "MemberA"
            }
          }
        },
        { "Op": "And" },
        { "Op": "Or" },
        { "Op": "And" }
      ]
    }
  ]