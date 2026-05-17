import { DisciplineList } from '@/widgets/Discipline';
import { Card, Title } from '@/shared';

export default function DisciplinesPage() {
  return (
    <>
      <Card>
        <Title type='h2' size='s'>
          Дисциплины и модули
        </Title>
        <DisciplineList />
      </Card>
    </>
  );
}
