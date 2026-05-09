import { NextResponse } from 'next/server';
import { UnitServerEndpoints } from '@/entities/unit/api';
import {
  IStructuralUnit,
  IStructuralUnitCreation,
} from '@/entities/unit/model';
import { safeParse } from '@/assets/lib/http/safeParse';

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

    const backendResponse = await fetch(
      UnitServerEndpoints.getStructuralUnits(organizationId, deleted),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const payload = await safeParse<IStructuralUnit[] | { message?: string }>(
      backendResponse,
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: 'Ошибка при получении подразделений.',
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json((payload as IStructuralUnit[] | null) ?? []);
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при получении подразделений.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IStructuralUnitCreation;

    if (!payload?.organization) {
      return NextResponse.json(
        {
          message:
            'Не переданы обязательные данные для создания подразделения.',
        },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      UnitServerEndpoints.createStructuralUnit(payload.organization),
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

    const responsePayload = await safeParse<IStructuralUnit>(backendResponse);

    return NextResponse.json(responsePayload ?? { success: true }, {
      status: 201,
    });
  } catch (_) {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при создании подразделения.' },
      { status: 500 },
    );
  }
}
