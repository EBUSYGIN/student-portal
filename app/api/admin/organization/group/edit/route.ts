import { NextRequest, NextResponse } from 'next/server';

import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerGroupEndpoints } from '@/entities/group/api';
import { IGroup } from '@/entities/group/model';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body?.id ||
      !body?.organization ||
      !body?.speciality ||
      !body?.sourceSpecialityId
    ) {
      return NextResponse.json(
        {
          message:
            'Не переданы id, organization, speciality или sourceSpecialityId.',
        },
        { status: 400 },
      );
    }

    const requestBody = {
      name: body.name,
      course: body.course ?? 1,
      semesters_number: body.semesters_number,
      speciality: body.speciality,
      structural_unit: body.structural_unit,
    };

    const url = ServerGroupEndpoints.editGroup(
      body.organization,
      body.sourceSpecialityId,
      body.id,
    );

    const requestInit = {
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store' as const,
    };

    let backendResponse = await fetch(url, {
      method: 'PATCH',
      ...requestInit,
    });

    if (backendResponse.status === 404) {
      backendResponse = await fetch(url, {
        method: 'PUT',
        ...requestInit,
      });
    }

    const payload = await safeParse<IGroup | { message?: string; detail?: string }>(
      backendResponse,
    );

    if (!backendResponse.ok) {
      const errorPayload = payload as { message?: string; detail?: string } | null;

      return NextResponse.json(
        {
          message:
            errorPayload?.message ||
            errorPayload?.detail ||
            'Ошибка при редактировании учебной группы.',
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(payload ?? { success: true });
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при редактировании учебной группы.' },
      { status: 500 },
    );
  }
}
