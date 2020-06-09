import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[app-input-number]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: InputNumberValidatorDirective,
        multi: true
    }]
})
export class InputNumberValidatorDirective implements Validator{
    validate(control: import("@angular/forms").AbstractControl): { [key: string]: any } | null {
        const numberValue = +control.value;
        if(typeof numberValue === "number" && numberValue <= 100 && numberValue >=0) {
            return null;
        }
        else {
            return {
                'InputError': 'Invalid input field'
            };         
        }
    }

    
}