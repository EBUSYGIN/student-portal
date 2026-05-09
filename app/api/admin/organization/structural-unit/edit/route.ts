import { UnitServerEndpoints } from '@/entities/unit/api';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { message: 'Не переданы id или organizationId.' },
        { status: 400 },
      );
    }

    const response = await fetch(
      UnitServerEndpoints.editStructuralUnit(body.organization, body.id),
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
        { message: 'Ошибка при редактировании подразделения.' },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при редактировании подразделения.' },
      { status: 500 },
    );
  }
}
