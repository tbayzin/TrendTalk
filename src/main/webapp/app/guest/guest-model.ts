export class GuestDTO {

  constructor(data:Partial<GuestDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  guestName?: string|null;

}
