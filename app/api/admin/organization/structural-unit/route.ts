import { NextResponse } from 'next/server';
import { UnitServerEndpoints } from '@/entities/unit/api';
import { IStructuralUnitCreation } from '@/entities/unit/model';

const parseJsonSafe = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const deleted = searchParams.get('deleted') === 'deleted' ? 'deleted' : undefined;

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

    const payload = await parseJsonSafe(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message:
            (payload as { message?: string } | null)?.message ||
            'Ошибка при получении подразделений.',
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(payload ?? []);
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

    if (!payload) {
      return NextResponse.json(
        {
          message: 'Не задано тело запроса.',
        },
        { status: 500 },
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

    if (!backendResponse.ok) {
      const errorPayload = await parseJsonSafe(backendResponse);

      return NextResponse.json(
        {
          message:
            (errorPayload as { message?: string } | null)?.message ||
            'Ошибка при создании подразделения.',
        },
        { status: backendResponse.status },
      );
    }

    const responsePayload = await parseJsonSafe(backendResponse);

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
