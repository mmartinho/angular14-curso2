import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
    public static somenteMinusculas(): ValidatorFn {
        return (control: AbstractControl) : ValidationErrors | null => {
            const value = control.value;
            if(!value) {
                return null;
            }
            const hasUpperCase = /[A-Z]+/.test(value);
            return hasUpperCase ? {somenteminusculas:true} : null;
        }
    }
}