import { Enums } from './enums';

export class PublishStatus {
  static readonly DRAFT = new PublishStatus('draft');
  static readonly PUBLISHED = new PublishStatus('published');

  private constructor(readonly publishStatus: string) {
    this.publishStatus = publishStatus;
  }

  static values(): PublishStatus[] {
    return [this.DRAFT, this.PUBLISHED];
  }

  toString(): string {
    return this.publishStatus;
  }

  toLongString(): string {
    return `${Enums.PUBLISH_STATUS}.${this.publishStatus}`;
  }

  static fromLongString(publishStatusStr: string): PublishStatus | undefined {
    for (let publishStatus of PublishStatus.values()) {
      if (publishStatus.toLongString() === publishStatusStr) {
        return publishStatus;
      }
    }
    return undefined;
  }
}
