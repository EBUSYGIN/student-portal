import { IGroup } from '../model';

const resolveRefId = (ref: unknown): string => {
  if (typeof ref === 'string') {
    return ref;
  }

  if (ref && typeof ref === 'object' && 'id' in ref) {
    return String((ref as { id: string }).id);
  }

  return '';
};

export const normalizeGroup = (raw: Record<string, unknown>): IGroup => ({
  id: String(raw.id ?? ''),
  name: String(raw.name ?? ''),
  course: Number(raw.course ?? 0),
  semesters_number: Number(raw.semesters_number ?? 0),
  speciality: resolveRefId(raw.speciality),
  structural_unit: resolveRefId(raw.structural_unit),
});

export const resolveOptionId = (
  value: string,
  options: { id: string; name: string }[],
  fallbackId: string,
): string => {
  if (options.some((option) => option.id === value)) {
    return value;
  }

  const byName = options.find((option) => option.name === value);

  if (byName) {
    return byName.id;
  }

  return fallbackId;
};
