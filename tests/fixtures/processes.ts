export default [
    {
      "name": "test-program-create",
      "version": 1,
      "program": [
        {
          "restriction": {
            "FixedNumberOfInputs": {
              "numInputs": 0
            }
          }
        },
        {
          "restriction": {
            "FixedNumberOfOutputs": {
              "numOutputs": 1
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "created"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValueType": {
              "index": 0,
              "metadataKey": "parameters",
              "metadataValueType": "File"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_a"
              }
            }
          }
        },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "OutputHasMetadata": {
              "index": 0,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        { "op": "And" },
        {
          "restriction": {
            "SenderHasOutputRole": {
              "index": 0,
              "roleKey": "Owner"
            }
          }
        },
        { "op": "And" }
      ]
    },
    {
      "name": "test-program-propose",
      "version": 1,
      "program": [
        {
          "restriction": {
            "FixedNumberOfInputs": {
              "numInputs": 2
            }
          }
        },
        {
          "restriction": {
            "FixedNumberOfOutputs": {
              "numOutputs": 3
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_a"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "created"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "type",
              "outputIndex": 0,
              "outputMetadataKey": "type"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "version",
              "outputIndex": 0,
              "outputMetadataKey": "version"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "subtype",
              "outputIndex": 0,
              "outputMetadataKey": "subtype"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "state",
              "outputIndex": 0,
              "outputMetadataKey": "state"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 0,
              "inputRoleKey": "Owner",
              "outputIndex": 0,
              "outputRoleKey": "Owner"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "originalId",
              "outputIndex": 0,
              "outputMetadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 0,
              "outputIndex": 0,
              "outputMetadataKey": "originalId"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "created"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "type",
              "outputIndex": 1,
              "outputMetadataKey": "type"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "version",
              "outputIndex": 1,
              "outputMetadataKey": "version"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "subtype",
              "outputIndex": 1,
              "outputMetadataKey": "subtype"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "state",
              "outputIndex": 1,
              "outputMetadataKey": "state"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 1,
              "inputRoleKey": "Owner",
              "outputIndex": 1,
              "outputRoleKey": "Owner"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "originalId",
              "outputIndex": 1,
              "outputMetadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 1,
              "outputIndex": 1,
              "outputMetadataKey": "originalId"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "roleKey": "Optimiser"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 0,
              "inputRoleKey": "Owner",
              "outputIndex": 2,
              "outputRoleKey": "MemberA"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 1,
              "inputRoleKey": "Owner",
              "outputIndex": 2,
              "outputRoleKey": "MemberB"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "MATCH2"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "proposed"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "originalId",
              "outputIndex": 2,
              "outputMetadataKey": "demandA"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 0,
              "outputIndex": 2,
              "outputMetadataKey": "demandA"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "originalId",
              "outputIndex": 2,
              "outputMetadataKey": "demandB"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 1,
              "outputIndex": 2,
              "outputMetadataKey": "demandB"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "OutputHasMetadata": {
              "index": 2,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        { "op": "And" }
      ]
    },
    {
      "name": "test-program-strings-and-numbers",
      "version": 1,
      "program": [
        {
          "restriction": {
            "FixedNumberOfInputs": {
              "numInputs": 3
            }
          }
        },
        {
          "restriction": {
            "FixedNumberOfOutputs": {
              "numOutputs": 3
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 0,
              "inputRoleKey": "Owner",
              "outputIndex": 0,
              "outputRoleKey": "Owner"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "type",
              "outputIndex": 0,
              "outputMetadataKey": "type"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_a"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "subtype",
              "outputIndex": 0,
              "outputMetadataKey": "subtype"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "version",
              "outputIndex": 0,
              "outputMetadataKey": "version"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "originalId",
              "outputIndex": 0,
              "outputMetadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 0,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 0,
              "outputIndex": 0,
              "outputMetadataKey": "originalId"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 0,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "created"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 0,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "allocated"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 1,
              "inputRoleKey": "Owner",
              "outputIndex": 1,
              "outputRoleKey": "Owner"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "DEMAND"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "type",
              "outputIndex": 1,
              "outputMetadataKey": "type"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "subtype",
              "metadataValue": {
                "Literal": "demand_b"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "subtype",
              "outputIndex": 1,
              "outputMetadataKey": "subtype"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "version",
              "outputIndex": 1,
              "outputMetadataKey": "version"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "originalId",
              "outputIndex": 1,
              "outputMetadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 1,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 1,
              "outputIndex": 1,
              "outputMetadataKey": "originalId"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 1,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "created"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 1,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "allocated"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 2,
              "inputRoleKey": "Optimiser",
              "outputIndex": 2,
              "outputRoleKey": "Optimiser"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 2,
              "inputRoleKey": "MemberA",
              "outputIndex": 2,
              "outputRoleKey": "MemberA"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputRole": {
              "inputIndex": 2,
              "inputRoleKey": "MemberB",
              "outputIndex": 2,
              "outputRoleKey": "MemberB"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadataKey": "type",
              "metadataValue": {
                "Literal": "MATCH2"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 2,
              "inputMetadataKey": "type",
              "outputIndex": 2,
              "outputMetadataKey": "type"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadataKey": "version",
              "metadataValue": {
                "Literal": "1"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 2,
              "inputMetadataKey": "version",
              "outputIndex": 2,
              "outputMetadataKey": "version"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 0,
              "inputMetadataKey": "originalId",
              "outputIndex": 2,
              "outputMetadataKey": "demandA"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 2,
              "inputMetadataKey": "demandA",
              "outputIndex": 2,
              "outputMetadataKey": "demandA"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 1,
              "inputMetadataKey": "originalId",
              "outputIndex": 2,
              "outputMetadataKey": "demandB"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 2,
              "inputMetadataKey": "demandB",
              "outputIndex": 2,
              "outputMetadataKey": "demandB"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "MatchInputOutputMetadataValue": {
              "inputIndex": 2,
              "inputMetadataKey": "originalId",
              "outputIndex": 2,
              "outputMetadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "InputHasMetadata": {
              "index": 2,
              "metadataKey": "originalId"
            }
          }
        },
        {
          "restriction": {
            "None": {}
          }
        },
        { "op": "NotL" },
        {
          "restriction": {
            "MatchInputIdOutputMetadataValue": {
              "inputIndex": 2,
              "outputIndex": 2,
              "outputMetadataKey": "originalId"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" },
        {
          "restriction": {
            "FixedOutputMetadataValue": {
              "index": 2,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "acceptedFinal"
              }
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "acceptedA"
              }
            }
          }
        },
        {
          "restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "roleKey": "MemberB"
            }
          }
        },
        { "op": "And" },
        {
          "restriction": {
            "FixedInputMetadataValue": {
              "index": 2,
              "metadataKey": "state",
              "metadataValue": {
                "Literal": "acceptedB"
              }
            }
          }
        },
        {
          "restriction": {
            "SenderHasOutputRole": {
              "index": 2,
              "roleKey": "MemberA"
            }
          }
        },
        { "op": "And" },
        { "op": "Or" },
        { "op": "And" }
      ]
    }
  ]