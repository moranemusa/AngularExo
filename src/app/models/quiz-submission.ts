/**
 * QuizSubmission: List of all answers for a given quiz,
 * as submitted by a specific user.
 */
import { Answer } from './answer';

export class QuizSubmission {
  // required
  quizId: number;
  answers: {[questionId: number]: Answer};
  score: number;
  // optional
  id: string;    // submission id
  user: string;  // User answering the quiz
  created: number = Date.now();

  constructor(options: {
    quizId: number;
    answers: {[questionId: number]: any};  // will be re-hydrated
    score: number;
    id?: string;
    user?: string;
    created?: number;
  }) {
    this.quizId = options.quizId;
    // Re-hydrate answers.
    this.answers = {};
    for (const prop in options.answers) {
      if (options.answers.hasOwnProperty(prop)) {
        this.answers[prop] = new Answer(options.answers[prop]);
      }
    }
    this.score = options.score;
    this.id = options.id || null;
    this.user = options.user || null;
  }

}
