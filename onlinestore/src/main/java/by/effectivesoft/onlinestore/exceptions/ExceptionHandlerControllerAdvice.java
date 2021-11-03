package by.effectivesoft.onlinestore.exceptions;

import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.io.FileNotFoundException;
import java.util.UUID;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice extends ResponseEntityExceptionHandler {

    private final static Logger LOGGER = LoggerFactory.getLogger(ExceptionHandlerControllerAdvice.class);

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponse> handleServiceException(
            ServiceException ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.ENTITY_NOT_FOUND.getCode(),ErrorCode.ENTITY_NOT_FOUND);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.ACCESS_DENIED.getCode(), ErrorCode.ACCESS_DENIED);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(),ErrorCode.INTERNAL_SERVER_ERROR.getCode(), ErrorCode.INTERNAL_SERVER_ERROR);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleFileNotFoundException(
            FileNotFoundException ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.FILE_NOT_FOUND.getCode(), ErrorCode.FILE_NOT_FOUND);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({PSQLException.class, IllegalArgumentException.class, BadSqlGrammarException.class})
    public ResponseEntity<ErrorResponse> handlePSQLException(
            Exception ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.INCORRECT_PARAMETERS_INPUT.getCode(), ErrorCode.INCORRECT_PARAMETERS_INPUT);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ErrorResponse> handleEmptyResultDataAccessException(
            EmptyResultDataAccessException ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.INCORRECT_ID_INPUT.getCode(), ErrorCode.INCORRECT_ID_INPUT);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(
            ConstraintViolationException ex, HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(generateErrorId(), ErrorCode.INVALID_INPUT.getCode(), ErrorCode.INVALID_INPUT);

        loggerMessage(request, error, ex);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    public void loggerMessage(HttpServletRequest request, ErrorResponse error, Exception e) {
        LOGGER.warn(String.format("User %s has an error %s, with id %s, %s", request.getUserPrincipal().getName(), error.getCode(), error.getId(), e));
    }

    public static String generateErrorId() {
        return "err|".concat(UUID.randomUUID().toString());
    }
}
