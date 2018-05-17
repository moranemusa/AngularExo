import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Question } from '../../models/question';
import { Answer } from '../../models/answer';
import { Choice } from '../../models/choice';



@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styles: []
})
export class QuizQuestionComponent implements OnChanges {
  // Question en cours
  @Input() question: Question;
  //question = new Question({
  //id: 12,
  // title: 'En quelle année AngularJS (première version) est-il sorti ?',
  //choices: [
  // { text: '2008' },
  // { text: '2009', isCorrect: true },
  // { text: '2012' },
  //{ text: '2014' }
  // ],
  //explanation: 'La version de 2009 est celle développé initialement par Miško Hevery, qui ne travaillait pas encore chez Google.'
  //});
  // Réponse en cours (réponse "vierge" pour l'instant)
  @Input() answer: Answer;
  //answer = new Answer({
  // questionId: 12,
  // multipleChoicesAllowed: false,
  // choices: [
  // { text: '2012' }
  // ]
  //});

  //on crée un output qui transmettra la réponse au parent
  @Output() submit = new EventEmitter<Answer>();

  isSubmitted: boolean; //le bouton "soumettre a t il été cliqué" "undefined"

  constructor() {



  }

  ngOnChanges() {
    this.isSubmitted = this.answer.isAnswered(); //méthode appelée a chaque changement des inputs
  }

  clickChoice(choice: Choice) {
    //Si déjà soumis, ne fais rien
    if (this.isSubmitted) {
      return;
    }
    if (this.answer.hasChoice(choice)) {//ca renvoie un boolean, si le choix socké ca renvoie vrai
      this.answer.removeChoice(choice);
    }
    else {
      this.answer.addChoice(choice);
    }

  }
  submitAnswer() {
    this.isSubmitted = true;
    this.submit.emit(this.answer);
  }
  get submitLabel() {
    return !this.isSubmitted ? 'Soumettre' : this.answer.isCorrect ? 'CORRECT' : 'INCORRECT';
  }

  get submitClass() {
    return !this.isSubmitted ? 'btn-primary' : this.answer.isCorrect ? 'btn-success' : 'btn-danger';
  }
  // Charge une nouvelle question et une nouvelle réponse.
  gotoNextQuestionTEMP() {
    this.question = new Question({
      'id': 35,
      'title': 'Angular est vraiment trop canon.',
      'choices': [
        { 'text': 'Vrai', 'isCorrect': true },
        { 'text': 'Faux' }
      ],
      'explanation': 'À ce stade, comment ne pas en être persuadé ? 😝'
    });
    this.answer = new Answer({
      questionId: 35,
      multipleChoicesAllowed: false
    });
    //recalculer le flag 'isSubmitted
    this.isSubmitted = this.answer.isAnswered();
  }
}
