import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styles: []
})
export class FieldComponent implements OnInit {

  @Input()  label: string;
  @Input() control: FormControl; //quizForm.get('title')
  

  constructor() { }

  ngOnInit() {
  }

}
