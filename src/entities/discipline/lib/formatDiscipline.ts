import { IDisciplineGroup, TDisciplineType } from '../model';

const TYPE_LABELS: Record<TDisciplineType, string> = {
  discipline: 'Дисциплина',
  module: 'Модуль',
};

export const getDisciplineTypeLabel = (type: TDisciplineType) =>
  TYPE_LABELS[type] ?? type;

export const formatSemesterHours = (
  hours: number[] | Record<string, number> | null | undefined,
) => {
  if (!hours) {
    return '—';
  }

  if (Array.isArray(hours)) {
    if (hours.length === 0) {
      return '—';
    }

    return hours.map((value, index) => `${index + 1} сем: ${value}`).join(', ');
  }

  const entries = Object.entries(hours).sort(
    ([left], [right]) => Number(left) - Number(right),
  );

  if (entries.length === 0) {
    return '—';
  }

  return entries.map(([semester, value]) => `${semester} сем: ${value}`).join(', ');
};

export const formatDisciplineGroups = (
  groups: IDisciplineGroup[] | string[] | null | undefined,
) => {
  if (!groups?.length) {
    return '—';
  }

  return groups
    .map((group) => (typeof group === 'string' ? group : group.name))
    .join(', ');
};
