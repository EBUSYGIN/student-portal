import { safeParse } from '@/assets/lib/http/safeParse';
import { IOrganization } from '@/entities/organization/ui';
import { IOrganizationCreation } from '@/entities/organization/model';
import { ServerOrganizationEndpoints } from '@/entities/organization/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deleted =
      searchParams.get('deleted') === 'deleted' ? 'deleted' : undefined;

    const backendResponse = await fetch(
      ServerOrganizationEndpoints.getOrganizations(deleted),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const payload = await safeParse<IOrganization[] | { message?: string }>(
      backendResponse,
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: 'Ошибка при получении организаций.',
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json((payload as IOrganization[] | null) ?? []);
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при получении организаций.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IOrganizationCreation;

    if (!payload?.name || !payload?.inn) {
      return NextResponse.json(
        { message: 'Не переданы обязательные данные для создания организации.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerOrganizationEndpoints.createOrganization(),
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

    const responsePayload = await safeParse<IOrganization>(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: 'Ошибка при создании организации.' },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(responsePayload ?? { success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при создании организации.' },
      { status: 500 },
    );
  }
}
