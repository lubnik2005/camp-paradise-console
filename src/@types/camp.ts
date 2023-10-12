export type Camp = {
  id: number;
  name: string;
  start_on: string;
  end_on: string;
  registration_start_at: string;
  registration_end_at: string;
  reservations: Array<any>;
};

export type Cot = {
  id: number;
  first_name?: string;
  last_name?: string;
  description?: string;
  price: number;
};

export type Room = {
  id: number;
  type: string;
  name: string;
};
