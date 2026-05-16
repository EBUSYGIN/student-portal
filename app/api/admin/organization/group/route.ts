import { NextResponse } from 'next/server';

import { safeParse } from '@/assets/lib/http/safeParse';
import { ServerGroupEndpoints } from '@/entities/group/api';
import { IGroup, IGroupCreation } from '@/entities/group/model';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const specialityId = searchParams.get('specialityId');
    const deleted =
      searchParams.get('deleted') === 'deleted' ? 'deleted' : undefined;

    if (!organizationId) {
      return NextResponse.json(
        { message: 'Не передан organizationId.' },
        { status: 400 },
      );
    }

    if (!specialityId) {
      return NextResponse.json(
        { message: 'Не передан specialityId.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerGroupEndpoints.getGroups(organizationId, specialityId, deleted),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const payload = await safeParse<IGroup[] | { message?: string }>(
      backendResponse,
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: 'Ошибка при получении учебных групп.' },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json((payload as IGroup[] | null) ?? []);
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при получении учебных групп.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IGroupCreation;

    if (!payload?.organization?.trim()) {
      return NextResponse.json(
        { message: 'Не передан organizationId.' },
        { status: 400 },
      );
    }

    if (!payload?.speciality?.trim()) {
      return NextResponse.json(
        { message: 'Не передана специальность.' },
        { status: 400 },
      );
    }

    if (!payload?.structural_unit?.trim()) {
      return NextResponse.json(
        { message: 'Не передано структурное подразделение.' },
        { status: 400 },
      );
    }

    if (!payload?.name?.trim()) {
      return NextResponse.json(
        { message: 'Не передано наименование.' },
        { status: 400 },
      );
    }

    if (
      typeof payload.semesters_number !== 'number' ||
      !Number.isFinite(payload.semesters_number) ||
      payload.semesters_number < 1
    ) {
      return NextResponse.json(
        { message: 'Укажите корректное количество семестров.' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(
      ServerGroupEndpoints.createGroup(
        payload.organization,
        payload.speciality,
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        body: JSON.stringify({
          name: payload.name.trim(),
          course: payload.course ?? 1,
          semesters_number: payload.semesters_number,
          speciality: payload.speciality,
          structural_unit: payload.structural_unit,
        }),
        cache: 'no-store',
      },
    );

    const responsePayload = await safeParse<
      IGroup | { message?: string; detail?: string }
    >(backendResponse);

    if (!backendResponse.ok) {
      const errorPayload = responsePayload as { message?: string; detail?: string } | null;

      return NextResponse.json(
        {
          message:
            errorPayload?.message ||
            errorPayload?.detail ||
            'Ошибка при создании учебной группы.',
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(responsePayload ?? { success: true }, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { message: 'Неизвестная ошибка при создании учебной группы.' },
      { status: 500 },
    );
  }
}
