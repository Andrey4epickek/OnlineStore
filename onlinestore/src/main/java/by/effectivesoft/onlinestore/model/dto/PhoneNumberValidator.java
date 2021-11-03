package by.effectivesoft.onlinestore.model.dto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    private final static String PHONE_NUMBER_FORMAT = "^\\+(?:[0-9] ?){1,3}[0-9]{6,9}$";

    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext constraintValidatorContext) {
        if (phone == null) {
            return false;
        }
        return phone.matches(PHONE_NUMBER_FORMAT);
    }
}
