import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerOrganizationEndpoints } from '@/entities/organization/api';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Не передан id организации.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(ServerOrganizationEndpoints.deleteOrganization(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
    });

    const payload = await safeParse<{ message?: string }>(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: payload?.message || 'Ошибка при удалении организации.',
        },
        { status: backendResponse.status },
      );
    }

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(
      {
        message: payload?.message || 'Организация удалена.',
      },
      { status: backendResponse.status },
    );
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при удалении организации.' },
      { status: 500 },
    );
  }
}
