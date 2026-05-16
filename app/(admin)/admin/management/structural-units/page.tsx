import { StructuralUnitList } from '@/widgets/StructuralUnit';
import { Card, Title } from '@/shared';

export default function ManagementPage() {
  return (
    <>
      <Card>
        <Title type={'h2'} size={'s'}>
          Структурные подразделения
        </Title>
        <StructuralUnitList />
      </Card>
    </>
  );
}
