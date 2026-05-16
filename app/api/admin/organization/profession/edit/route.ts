import { NextRequest, NextResponse } from 'next/server';

import { ServerProfessionEndpoints } from '@/entities/profession/api';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.id || !body?.organization) {
      return NextResponse.json(
        { message: 'Не переданы id или organization.' },
        { status: 400 },
      );
    }

    const response = await fetch(
      ServerProfessionEndpoints.editProfession(body.organization, body.id),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Ошибка при редактировании специальности.' },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при редактировании специальности.' },
      { status: 500 },
    );
  }
}
