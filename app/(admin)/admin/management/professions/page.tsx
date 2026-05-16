import { ProfessionList } from '@/widgets/Profession';
import { Card, Title } from '@/shared';

export default function ProfessionsPage() {
  return (
    <>
      <Card>
        <Title type={'h2'} size={'s'}>
          Специальности
        </Title>
        <ProfessionList />
      </Card>
    </>
  );
}
