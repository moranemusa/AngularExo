/**
 * @file
 * One of the possible answers for a given question.
 *
 * Any question must have at least two choices.
 */
export class Choice {
  text: string;
  isCorrect: boolean;

  constructor(options: {
    text?: string;
    isCorrect?: boolean;
  } = {}) {
    this.text = options.text || '';
    this.isCorrect = options.isCorrect === undefined ? false : options.isCorrect;
  }

  /**
   * Return a JSON representation of the choice
   * which is compatible with our backend.
   */
  toJson() {
    return {
      text: this.text,
      isCorrect: this.isCorrect
    };
  }
}
