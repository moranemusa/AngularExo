import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FakeQuizService } from '../fake-quiz.service';

import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';


@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html'
})
export class QuestionsListComponent implements OnInit {
  quiz: Quiz;
  questionInEdition: Question;         // Instance of the question being edited.
  hasPendingChanges = false;  // true of a question has been changed/added/deleted.
  isEditMode = false;         // true if a question is being created/edited.

  constructor(private route: ActivatedRoute,
              private router: Router,
              private qs: FakeQuizService) {}

  ngOnInit() {
    const quizId = +this.route.snapshot.params['quizId'];
    this.qs.loadQuiz(quizId)
      .subscribe(quiz => this.quiz = quiz);
  }

  // Show the add question form.
  addNewQuestion() {
    this.questionInEdition = new Question();
    this.isEditMode = true;
  }

  // Show the edit question form.
  editQuestion(question: Question) {
    this.questionInEdition = question;
    this.isEditMode = true;
  }

  // Hide the add/edit question form.
  cancelEdit() {
    this.questionInEdition = null;
    this.isEditMode = false;
  }

  /**
   * Add the given question to the ** LOCAL ** questionSet.
   * Call .saveQuestionSet() to persist changes to the server.
   */
  addQuestion(question: Question) {
    // Updating existing question?
    if (question.id) {
      const index = this.getQuestionIndex(question);
      this.quiz.questions[index] = question;
    // Or adding new question?
    } else {
      question.id = this.generateNextQuestionId();
      this.quiz.questions.push(question);
    }
    this.hasPendingChanges = true;
    this.isEditMode = false;
  }

  /**
   * Delete the given question from the ** LOCAL ** questionSet.
   * Call .saveQuestionSet() to persist changes to the server.
   */
  deleteQuestion(question: Question) {
    const index = this.getQuestionIndex(question);
    this.quiz.questions.splice(index, 1);
    this.hasPendingChanges = true;
  }

  /**
   * Move the given question one position before its current position.
   * Call .saveQuestionSet() to persist changes to the server.
   */
  moveQuestionUp(question: Question) {
    const index = this.getQuestionIndex(question);
    if (index > 0) {
      const q1 = this.quiz.questions[(index - 1)];
      const q2 = this.quiz.questions[index];
      this.quiz.questions[(index - 1)] = q2;
      this.quiz.questions[index] = q1;
      this.hasPendingChanges = true;
    }
  }

  /**
   * Move the given question one position after its current position.
   * Call .saveQuestionSet() to persist changes to the server.
   */
  moveQuestionDown(question: Question) {
    const index = this.getQuestionIndex(question);
    if (index < this.quiz.questions.length) {
      const q1 = this.quiz.questions[index];
      const q2 = this.quiz.questions[(index + 1)];
      this.quiz.questions[index] = q2;
      this.quiz.questions[(index + 1)] = q1;
      this.hasPendingChanges = true;
    }
  }

  /**
   * Persist ALL changes to the server.
   */
  saveQuiz() {
    console.log('questions', this.quiz.questions);

    this.qs.saveQuiz(this.quiz)
      .subscribe((ret: any) => {
        alert('Les questions ont bien été enregistrées');
        this.router.navigate(['/admin/quiz']);
      });

  }

  /**
   * Return the zero-based index for the given question.
   */
  private getQuestionIndex(question: Question): number {
    return this.quiz.questions.findIndex(q => q.id === question.id);
  }

  /**
   * Generate the id for the next question.
   */
  private generateNextQuestionId(): number {
    if (this.quiz.questions.length) {
      const ids = this.quiz.questions.map(q => q.id);
      return Math.max(...ids) + 1;
    }
    return 1;
  }

  get debug() {
    return { questions: this.quiz && this.quiz.questions };
  }

}
