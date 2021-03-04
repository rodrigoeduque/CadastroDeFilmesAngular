import { ValidarCamposService } from './../../validar-campos.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent  {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao : ValidarCamposService) { }

get formControl() : AbstractControl {
  return this.formGroup.controls[this.controlName];
}

}
