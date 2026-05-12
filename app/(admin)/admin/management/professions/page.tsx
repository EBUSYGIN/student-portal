import { IProfession } from '@/entities/profession/model';
import { ProfessionList } from '@/widgets/Profession';
import { Card, Title } from '@/shared';

const professions: IProfession[] = [
  {
    id: '1',
    code: '09.02.07',
    name: 'Информационные системы и программирование',
    type: 'specialty',
    semesters_number: 8,
    organization: '',
  },
  {
    id: '2',
    code: '43.01.09',
    name: 'Повар, кондитер',
    type: 'profession',
    semesters_number: 6,
    organization: '',
  },
];

export default function ProfessionsPage() {
  return (
    <>
      <Card>
        <Title type={'h2'} size={'s'}>
          Специальности
        </Title>
        <ProfessionList professions={professions} />
      </Card>
    </>
  );
}
