import { NextResponse } from 'next/server';

import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerGroupEndpoints } from '@/entities/group/api';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const specialityId = searchParams.get('specialityId');
    const id = searchParams.get('id');

    if (!organizationId || !specialityId || !id) {
      return NextResponse.json(
        { message: 'Не переданы organizationId, specialityId или id.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerGroupEndpoints.deleteGroup(organizationId, specialityId, id),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
      },
    );

    const payload = await safeParse<{ message?: string }>(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: payload?.message || 'Ошибка при удалении учебной группы.',
        },
        { status: backendResponse.status },
      );
    }

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(
      {
        message: payload?.message || 'Учебная группа удалена.',
      },
      { status: backendResponse.status },
    );
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при удалении учебной группы.' },
      { status: 500 },
    );
  }
}
