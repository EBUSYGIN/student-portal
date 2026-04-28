import { NextResponse } from 'next/server';

export async function GET() {
  const userResponse = {
    uuid: 'uuid пользователя',
    email: 'mail@mail.ru',
    snils: '161-***-***-22',
    last_name: 'Фамилия',
    first_name: 'Имя',
    middle_name: 'Отчество (Может не быть)',
    birthday_date: '2007-04-09',
    organization: {
      name: 'Название организации',
      speciality: 'Название специальности',
      course: 3,
      group: 'Название группы',
    },
    parents: [
      {
        parent_name: 'Иванов Иван Иванович',
        email: 'mail@mail.ru',
      },
      {
        parent_name: 'Петров Петр Петрович',
        email: 'mail@mail.ru',
      },
    ],
  };

  return NextResponse.json(userResponse);
}
