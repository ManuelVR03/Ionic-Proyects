import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  validations_form!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private navCtrl: NavController) {}

  validationMessages = {
    dni: [
      { type: 'required', message: 'DNI es obligatorio' },
      { type: 'minlength', message: 'Longitud minima 9 caracteres.' },
      { type: 'maxlength', message: 'Longitud máxima 9 caracteres.' },
      { type: 'pattern', message: 'Patrón incorrecto' },
      { type: 'validDNI', message: 'La letra no corresponde con el número' },
    ],
    iban: [
      { type: 'required', message: 'IBAN es obligatorio' },
      { type: 'minlength', message: 'Longitud minima 24 caracteres.' },
      { type: 'maxlength', message: 'Longitud máxima 24 caracteres.' },
      { type: 'pattern', message: 'Patrón incorrecto' }
    ]
  };

  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      dni: new FormControl('', Validators.compose([
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('[0-9]{8,8}[A-Za-z]'),
        Validators.required,
        this.validDNI(),
      ])),
      iban: new FormControl('', Validators.compose([
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.pattern('ES[0-9]{22}'),
        Validators.required
      ]))
    });
  }

  validDNI(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const number = parseInt(value.slice(0, 8), 10);
      const letter = value.charAt(8);
      const validLetter = 'TRWAGMYFPDXBNJZSQVHLCKE'[number % 23];

      if (letter !== validLetter) {
        return { validDNI: true };
      }

      return null;
    };
  }

  onSubmit(values: any){
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values)
      }
    };
    this.navCtrl.navigateForward('/datos', navigationExtras);
  }

}
