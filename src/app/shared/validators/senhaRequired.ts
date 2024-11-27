import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function senhaRequiredIfUsuarioIdZero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const usuarioId = control.parent?.get('usuarioId')?.value;
    const senha = control.value;

    if ((usuarioId === 0 || usuarioId === null) && !senha) {
      return { required: true };
    }
    
    return null;
  };
}
