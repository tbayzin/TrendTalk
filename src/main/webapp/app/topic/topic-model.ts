export class TopicDTO {

  constructor(data:Partial<TopicDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  topicName?: string|null;

}
