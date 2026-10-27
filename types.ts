export interface Question {
  id: number;
  letter: string;
  part: number;
  partTitleEs: string;
  partTitleHy: string;
  textEs: string;
  textHy: string;
  isTrue: boolean;
  explanationEs?: string;
  explanationHy?: string;
}

export type LetterStatus = 'pending' | 'passed' | 'correct' | 'incorrect';

export interface AnswerRecord {
  questionId: number;
  userAnswer: boolean;
  isCorrect: boolean;
  answeredAt: number;
}
