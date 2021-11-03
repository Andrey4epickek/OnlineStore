package by.effectivesoft.onlinestore.model.dto;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
@Documented
public @interface PhoneNumber {
    String message() default "Invalid phoneNumber";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
