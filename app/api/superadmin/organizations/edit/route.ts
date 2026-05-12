import { ServerOrganizationEndpoints } from '@/entities/organization/api';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.id) {
      return NextResponse.json(
        { message: 'Не передан id организации.' },
        { status: 400 },
      );
    }

    const response = await fetch(ServerOrganizationEndpoints.editOrganization(body.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Ошибка при редактировании организации.' },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при редактировании организации.' },
      { status: 500 },
    );
  }
}
