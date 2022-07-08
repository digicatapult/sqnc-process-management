type option = {
API_HOST: string,
API_PORT: number,
METADATA_KEY_LENGTH: number,
METADATA_VALUE_LITERAL_LENGTH: number,
PROCESS_IDENTIFIER_LENGTH: number,
}

const option: option = ({
    API_HOST: "localhost",
    API_PORT: 9944,
    METADATA_KEY_LENGTH: 32,
    METADATA_VALUE_LITERAL_LENGTH: 32,
    PROCESS_IDENTIFIER_LENGTH: 32
});

export default option