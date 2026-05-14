export type TProfessionType = 'specialty' | 'profession';

export interface IProfession {
  id: string;
  name: string;
  code: string;
  semesters_number: number;
  type: TProfessionType;
  organization: string;
}

export interface IProfessionCreation {
  code: string;
  name: string;
  type: TProfessionType;
  semesters_number: number;
  organization: string;
}
