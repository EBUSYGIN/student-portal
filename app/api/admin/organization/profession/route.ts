import { NextResponse } from 'next/server';

import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerProfessionEndpoints } from '@/entities/profession/api';
import { IProfession, IProfessionCreation } from '@/entities/profession/model';

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
      ServerProfessionEndpoints.getProfessions(organizationId, deleted),
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
          message: 'Ошибка при получении специальностей.',
        },
        { status: response.status },
      );
    }
    const payload = await safeParse<IProfession[] | { message?: string }>(
      response,
    );

    return NextResponse.json((payload as IProfession[] | null) ?? []);
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при получении специальностей.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IProfessionCreation;

    if (!payload?.organization) {
      return NextResponse.json(
        {
          message:
            'Не переданы обязательные данные для создания специальности.',
        },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerProfessionEndpoints.createProfession(payload.organization),
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

    const responsePayload = await safeParse<IProfession>(backendResponse);

    return NextResponse.json(responsePayload ?? { success: true }, {
      status: 201,
    });
  } catch (_) {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при создании специальности.' },
      { status: 500 },
    );
  }
}
