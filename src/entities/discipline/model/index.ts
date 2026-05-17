export type TDisciplineType = 'discipline' | 'module';

export interface IDisciplineGroup {
  id: string;
  name: string;
}

export interface IDiscipline {
  id: string;
  name: string;
  short_name: string;
  type: TDisciplineType;
  organization: string;
  semester_hours?: number[];
  groups?: IDisciplineGroup[] | string[];
}

export interface IDisciplineCreation {
  name: string;
  short_name: string;
  type: TDisciplineType;
  organization: string;
}
