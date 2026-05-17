import { NextResponse } from 'next/server';

import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerDisciplineEndpoints } from '@/entities/discipline/api';
import { IDiscipline, IDisciplineCreation } from '@/entities/discipline/model';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const deleted =
      searchParams.get('deleted') === 'deleted' ? 'deleted' : undefined;

    if (!organizationId) {
      return NextResponse.json(
        { message: 'Не передан organizationId.' },
        { status: 400 },
      );
    }

    const response = await fetch(
      ServerDisciplineEndpoints.getDisciplines(organizationId, deleted),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: 'Ошибка при получении дисциплин.',
        },
        { status: response.status },
      );
    }

    const payload = await safeParse<IDiscipline[] | { message?: string }>(
      response,
    );

    return NextResponse.json((payload as IDiscipline[] | null) ?? []);
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при получении дисциплин.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IDisciplineCreation;

    if (!payload?.organization) {
      return NextResponse.json(
        {
          message: 'Не переданы обязательные данные для создания дисциплины.',
        },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerDisciplineEndpoints.createDiscipline(payload.organization),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      },
    );

    const responsePayload = await safeParse<IDiscipline>(backendResponse);

    return NextResponse.json(responsePayload ?? { success: true }, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при создании дисциплины.' },
      { status: 500 },
    );
  }
}
