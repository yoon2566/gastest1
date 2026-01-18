
export enum LevelType {
  MOUSE_CLICK = 'MOUSE_CLICK',
  KEYBOARD_KR = 'KEYBOARD_KR',
  KEYBOARD_EN = 'KEYBOARD_EN',
  CLIPBOARD = 'CLIPBOARD',
  FILE_SYSTEM = 'FILE_SYSTEM',
  ETIQUETTE = 'ETIQUETTE'
}

export interface Level {
  id: number;
  title: string;
  description: string;
  type: LevelType;
  instructions: string;
  lang?: 'KR' | 'EN';
}

export interface GameState {
  score: number;
  currentLevel: number;
}
