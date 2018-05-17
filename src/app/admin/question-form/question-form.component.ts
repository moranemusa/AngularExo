import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Choice } from '../../models/choice';
import { Question } from '../../models/question';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styles: [`
    form { background-color: #fff4e6; border: 2px solid #be9b7b; padding: 10px; }
  `]
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  @Input() question: Question;  // question being edited
  @Output() onCancelEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmitQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.questionForm = this.fb.group({
      title: [this.question.title, Validators.required],
      explanation: [this.question.explanation],
      choices: this.buildChoicesArray(this.question.choices),
    });
  }

  // Build the choices form array based on the data model.
  buildChoicesArray(choices: Choice[]) {
    const fromGroupsArray: FormGroup[] = [];
    // If the choices are empty, we're creating a new question
    // and we need to let the user see at least one empty choice.
    if (choices.length === 0) {
      choices.push(new Choice());
    }
    choices.forEach(choice => {
      fromGroupsArray.push(this.createChoice(choice));
    });
    return this.fb.array(fromGroupsArray);
  }

  createChoice(choice: Choice): FormGroup {
    return this.fb.group({
      text: [choice.text, Validators.required],
      isCorrect: [choice.isCorrect]
    });
  }

  addChoice() {
    // Note. The <FormArray> type cast is required to avoid the error
    // "Property 'push' does not exist on type 'AbstractControl'".
    const control = <FormArray>this.questionForm.get('choices');
    control.push(this.createChoice(new Choice()));

    return false; // No action on the <button>
  }

  removeChoice(i: number) {
    // Note. The <FormArray> type cast is required to avoid the error
    // "Property 'push' does not exist on type 'AbstractControl'".
    const control = <FormArray>this.questionForm.get('choices');
    control.removeAt(i);

    return false; // No action on the <button>
  }

  submitQuestion() {
    // Merge form values with original question (to persist question.id, etc.)
    const questionData: any = Object.assign(this.question.toJson(), this.questionForm.value);
    const question: Question = new Question(questionData);
    this.onSubmitQuestion.emit(question);
  }

  cancelEdit(): void {
    this.onCancelEdit.emit('Edit cancelled');
  }

}
