/**
 * @file
 * A quiz and its metadata.
 */
import { Question } from './question';

//const q=new Quiz({
//id:13,
//title:'foot',
//});

interface QuizOption {
  id?: number;
  title?: string;
  description?: string;
  canRetryQuestion?: boolean;
  questions?: any[];
}
export class Quiz {
  id: number;
  title: string;
  description: string;
  canRetryQuestion: boolean;
  questions: Question[];

  constructor(options: QuizOption = {}) {
    this.id = options.id || null;
    this.title = options.title || '';// si pas de valeur donc ''
    this.description = options.description || '';
    this.canRetryQuestion = options.canRetryQuestion === undefined ? false : options.canRetryQuestion;
    // Re-hydrate the questions.
    this.questions = options.questions ? options.questions.map((q: any) => new Question(q)) : [];
  }

  /**
   * Return a JSON representation of the quiz
   * which is compatible with our backend.
   */
  toJson() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      canRetryQuestion: this.canRetryQuestion,
      questions: this.questions.map(q => q.toJson())
    };
  }

}
