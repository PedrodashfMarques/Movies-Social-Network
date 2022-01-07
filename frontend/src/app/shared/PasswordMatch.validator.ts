import { FormGroup } from "@angular/forms";

export function passwordMatch(passwordName: string, confirmPasswordName: string){
    
    return (formGroup: FormGroup) => {
        let control = formGroup.controls[passwordName];
        let matchingControl = formGroup.controls[confirmPasswordName];

        if(matchingControl.errors && !matchingControl.errors.passwordMatch){
            return;
        }

        if(control.value !== matchingControl.value){
            matchingControl.setErrors({passwordMatch: true});

        } else {
            matchingControl.setErrors(null);
        }

    }
}