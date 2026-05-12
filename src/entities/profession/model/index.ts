export interface IProfession {
  id: string;
  name: string;
  code: string;
  semesters_number: number;
  type: 'specialty' | 'profession';
  organization: string;
}
