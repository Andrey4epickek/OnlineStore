package by.effectivesoft.onlinestore.exceptions;

public class ErrorResponse {

    private String id;
    private String code;
    private Enum message;

    public ErrorResponse(String id, String code, Enum message) {
        this.id = id;
        this.code = code;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Enum getMessage() {
        return message;
    }

    public void setMessage(Enum message) {
        this.message = message;
    }
}
