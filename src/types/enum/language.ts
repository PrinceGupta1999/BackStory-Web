import { Enums } from './enums';

export class Language {
  static readonly ENGLISH_US = new Language('english', 'en-US');

  private constructor(readonly language: string, readonly code: string) {
    this.language = language;
    this.code = code;
  }

  static values(): Language[] {
    return [this.ENGLISH_US];
  }

  toString(): string {
    return this.language;
  }

  toLongString(): string {
    return `${Enums.LANGUAGE}.${this.language}`;
  }

  static fromLongString(languageStr: string): Language | undefined {
    for (let language of Language.values()) {
      if (language.toLongString() === languageStr) {
        return language;
      }
    }
    return undefined;
  }
}
