export interface IUserResponse {
  uuid: string;
  email: string;
  snils: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  birthday_date: string;
  organization: IOrganization;
  parents?: IParent[];
}

export interface IOrganization {
  name: string;
  speciality: string;
  course: number;
  group: string;
}

export interface IParent {
  parent_name: string;
  email: string;
}
