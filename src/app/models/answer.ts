/**
 * @file
 * Answer for a given quiz question, i.e. the list of choices
 * selected for that question.
 *
 * The list of all answers for a given quiz are stored
 * as a `QuizSubmission` object.
 */
import { Choice } from './choice';

export class Answer {
  questionId: number;               // Question being answered
  private _multipleChoicesAllowed: boolean;  // Can that question have multiple choices?
  private _choices: Choice[];       // Choices selected for that question

  constructor(options: {
    questionId: number;
    multipleChoicesAllowed?: boolean;
    choices?: any[];     // Will be re-hydrated
  }) {
    this.questionId = options.questionId;
    this._multipleChoicesAllowed = options.multipleChoicesAllowed === undefined ? false : options.multipleChoicesAllowed;
    // Re-hydrate the choices.
    this._choices = options.choices ? options.choices.map((c: any) => new Choice(c)) : [];
  }

  // Sélectionner un choix
  addChoice(choice: Choice) {
    if (!this._multipleChoicesAllowed) {
      this._choices = [];
    }
    this._choices.push(choice);
  }

  // Dé-sélectionner un choix
  removeChoice(choice: Choice) {
    const index = this._choices.findIndex(c => c.text === choice.text);
    if (index !== -1) {
      this._choices.splice(index, 1);
    }
  }

  // Tester qu'un choix est sélectionné
  hasChoice(choice: Choice): boolean {
    return this._choices.findIndex(c => c.text === choice.text) !== -1;
  }

  // Renvoie true si la question courante a au moins un choix sélectionné
  isAnswered(): boolean {
    return this._choices.length > 0;
  }

  /**
   * Return true if the current choices are all correct.
   *
   * When multiple choices are possible, if only one choice
   * is incorrect, the answer is considered incorrect.
   */
  get isCorrect(): boolean {
    if (!this.isAnswered()) {
      return false;
    }
    // Will be true if at least one incorrect choice is found.
    const foundIncorrectChoice = this._choices.some(choice => {
      // The negation below will return true if incorrect choice found,
      // then Array.some() will return true.
      return !choice.isCorrect;
    });
    return !foundIncorrectChoice;
  }

  toJson() {
    return {
      questionId: this.questionId,
      multipleChoicesAllowed: this._multipleChoicesAllowed,
      choices: this._choices.map(c => c.toJson())
    };
  }
}
