/**
 * @file
 * Service to manage the quiz state (i.e. current quiz, current question, etc.)
 */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Models
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Answer } from '../models/answer';


/**
 * Stores the question being currently displayed.
 * The `allQuestionIds` property contains all questions of the current
 * quiz and is here for assisting with navigation.
 */
export interface QuestionState {
  currentQuestionId: number;
  allQuestionIds: number[];
}
const initialQuestionState = { currentQuestionId: null, allQuestionIds: [] };

/**
 * Stores all the answers submitted so far by the user,
 * keyed by questionId.
 */
export interface AnswersState {
  [questionId: number]: Answer;
}


@Injectable()
export class QuizStateManager {
  private currentQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(null);
  private questionState$: BehaviorSubject<QuestionState> = new BehaviorSubject<QuestionState>(initialQuestionState);
  private currentAnswers$: BehaviorSubject<AnswersState> = new BehaviorSubject<AnswersState>({});

  hasPendingChanges: boolean;  // true as long as the quiz has unsaved answers
                               // Used by the canDeactivate guard

  /**
   * Public API for this service.
   */

  // A quiz is required to dispatch this action. If no quiz --> reset.
  setQuiz(quiz: Quiz) {
    quiz ? this._setCurrentQuizAction(quiz) : this.resetQuiz();
  }

  resetQuiz() {
    this._resetQuizAction();
    this.hasPendingChanges = false;
  }

  getCurrentQuiz(): Observable<Quiz> {
    return this.currentQuiz$.asObservable();
  }

  gotoFirstQuestion() {
    this._setToFirstQuestionAction();
  }

  gotoPreviousQuestion() {
    this._decrementQuestionAction();
  }

  gotoNextQuestion() {
    this._incrementQuestionAction();
  }

  /**
   * Obtain the actual question data from `state.questionState`.
   */
  getCurrentQuestion(): Observable<Question> {
    return this.questionState$
      .mergeMap((qState) => {
        return this.getCurrentQuiz().map((quiz: any) => {
          if (qState && qState.currentQuestionId && quiz && quiz.questions) {
            return quiz.questions.find((q: Question) => q.id == qState.currentQuestionId);
          }
        });
      });
  }

  /**
   * Add the answer ** for the current question of the current quiz **
   */
  addAnswer(answer: Answer) {
    this._addAnswerAction(answer);
    this.hasPendingChanges = true;
  }

  getCurrentAnswers(): Observable<AnswersState> {
    return this.currentAnswers$.asObservable();
  }

  getCurrentAnswer(): Observable<Answer> {
    return this.getCurrentAnswers()
      .mergeMap(answers =>
        this.questionState$.map(qState => {
          return answers[qState.currentQuestionId] || new Answer({ questionId: qState.currentQuestionId });
        })
      );
  }

  /**
   * Private methods which update the state.
   * Similar to Redux "actions".
   */

  private _setCurrentQuizAction(quiz: Quiz) {
    // Set the current quiz.
    this.currentQuiz$.next(quiz);
    // Setting the current quiz resets the current question + sets the list of question ids.
    this.questionState$.next({
      currentQuestionId: null,
      allQuestionIds: quiz.questions.map((q: any) => q.id)
    });
    // Setting the current quiz resets the current answers.
    this.currentAnswers$.next({});
  }

  // Reset everything: quiz + current question + current answers.
  private _resetQuizAction() {
    this.currentQuiz$.next(null);
    this.questionState$.next({ currentQuestionId: null, allQuestionIds: [] });
    this.currentAnswers$.next({});
  }

  private _setToFirstQuestionAction() {
    if (this.currentQuiz$.getValue()) {
      let qState = this.questionState$.getValue();
      qState = Object.assign({}, qState, { currentQuestionId: qState.allQuestionIds[0] });
      this.questionState$.next(qState);
    }
  }

  private _incrementQuestionAction() {
    if (this.currentQuiz$.getValue()) {
      let qState = this.questionState$.getValue();
      const nextIndex = qState.allQuestionIds.indexOf(qState.currentQuestionId) + 1;
      const nextId = nextIndex < qState.allQuestionIds.length ? qState.allQuestionIds[nextIndex] : qState.currentQuestionId;
      qState = Object.assign({}, qState, { currentQuestionId: nextId });
      this.questionState$.next(qState);
    }
  }

  private _decrementQuestionAction() {
    if (this.currentQuiz$.getValue()) {
      let qState = this.questionState$.getValue();
      const prevIndex = qState.allQuestionIds.indexOf(qState.currentQuestionId) - 1;
      const prevId = prevIndex >= 0 ? qState.allQuestionIds[prevIndex] : qState.currentQuestionId;
      qState = Object.assign({}, qState, { currentQuestionId: prevId });
      this.questionState$.next(qState);
    }
  }

  private _addAnswerAction(answer: Answer) {
    const newAnswer = {};
    newAnswer[answer.questionId] = answer;
    let aState = this.currentAnswers$.getValue();
    aState = Object.assign({}, aState, newAnswer);
    this.currentAnswers$.next(aState);
  }

}
