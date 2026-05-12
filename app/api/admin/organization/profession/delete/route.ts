import { NextResponse } from 'next/server';
import { ProfessionServerEndpoints } from '@/entities/profession/api';
import { safeParse } from '@/assets/lib/http/safeParse';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const id = searchParams.get('id');

    if (!organizationId || !id) {
      return NextResponse.json(
        { message: 'Не переданы organizationId или id.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ProfessionServerEndpoints.deleteProfession(organizationId, id),
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
          message: payload?.message || 'Ошибка при удалении специальности.',
        },
        { status: backendResponse.status },
      );
    }

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(
      {
        message: payload?.message || 'Специальность удалена.',
      },
      { status: backendResponse.status },
    );
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при удалении специальности.' },
      { status: 500 },
    );
  }
}
