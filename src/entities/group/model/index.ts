export interface IGroup {
  id: string;
  name: string;
  course: number;
  semesters_number: number;
  speciality: string;
  structural_unit: string;
}

export interface IGroupCreation {
  name: string;
  course: number;
  semesters_number: number;
  speciality: string;
  structural_unit: string;
  organization: string;
}

export interface IGroupEdit extends IGroup {
  organization: string;
  /** Специальность, под которой группа загружена (для URL PATCH) */
  sourceSpecialityId: string;
}
