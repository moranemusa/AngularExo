import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { QuizSubmission } from '../../models/quiz-submission';



@Component({
  selector: 'app-quiz-nav',
  templateUrl: './quiz-nav.component.html',
  styles: []
})
export class QuizNavComponent {
  @Input() quiz: Quiz;           // Current quiz
  @Input() question: Question;   // Current question
  @Input() answers: any;         // All answers submitted so far, keyed by questionId
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() saveQuizSubmission = new EventEmitter<QuizSubmission>();

  get isFirstQuestion(): boolean {
    return this.quiz.questions.indexOf(this.question) === 0;
  }

  get isLastQuestion(): boolean {
    return this.quiz.questions.indexOf(this.question) === (this.quiz.questions.length-1);
  }

  get questionIndex(): number {
    return this.quiz.questions.indexOf(this.question) + 1;
  }

  // Calculate the live, current score.
  get currentScore(): number {
    return Object.values(this.answers).reduce((acc, answer) => {
      return acc + (answer.isCorrect ? 1 : 0);
    }, 0);
  }

  get isNextButtonDisabled(): boolean {
    // Return true if the current question is NOT answered.
    return !this.answers[this.question.id];
  }

  // Emit the quiz submission.
  submitQuiz() {
    const quizSubmission = new QuizSubmission({
      quizId: this.quiz.id,
      answers: this.answers,
      score: this.currentScore
    });
    this.saveQuizSubmission.emit(quizSubmission);
  }
}
