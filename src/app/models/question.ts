/**
 * @file
 * A single quiz question, with the list of possible choices
 * for that question.
 */
import { Choice } from './choice';

export class Question {
  id: number;
  // Future versions of LiveQuiz could support different types
  // of questions: true/false, fill in the blanks...
  questionType: string;
  title: string;
  explanation: string;  // Explanation for the correct answer(s)
  choices: Choice[];

  multipleChoicesAllowed = false;

  constructor(options: {
    id?: number;
    questionType?: string;
    title?: string;
    explanation?: string;
    choices?: any[];    // Pass raw data. Will be re-hydrated.
  } = {}) {
    this.id = options.id || null;
    this.questionType = options.questionType || 'multiple_choice';
    this.title = options.title || '';
    this.explanation = options.explanation || '';
    // Re-hydrate the choices.
    this.choices = options.choices ? options.choices.map((c: any) => new Choice(c)) : [];
    // If the question has several correct choices,
    // set a flag to indicate it accepts multiple answers.
    const numCorrectChoices = this.choices.reduce((acc: number, c: Choice) => acc = acc + (c.isCorrect ? 1 : 0), 0);
    if (numCorrectChoices > 1) {
      this.multipleChoicesAllowed = true;
    }
  }

  /**
   * Return a string listing containing the correct choice(s)
   * for that question.
   */
  getCorrectChoices(): string {
    return this.choices.filter(c => c.isCorrect).map(c => c.text).join(', ');
  }

  /**
   * Return a JSON representation of the question
   * which is compatible with our backend.
   */
  toJson() {
    return {
      id: this.id,
      questionType: this.questionType,
      title: this.title,
      explanation: this.explanation,
      choices: this.choices.map(c => c.toJson())
    };
  }
}
