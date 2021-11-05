package by.effectivesoft.onlinestore.exceptions;

public enum ErrorCode {
    ENTITY_NOT_FOUND("ERR001"),
    INCORRECT_PARAMETERS_INPUT("ERR002"),
    INCORRECT_ID_INPUT("ERR003"),
    FILE_NOT_FOUND("ERR004"),
    INTERNAL_SERVER_ERROR("ERR005"),
    INVALID_INPUT("ERR006"),
    ACCESS_DENIED("ERR007");

    private String code;

    ErrorCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
