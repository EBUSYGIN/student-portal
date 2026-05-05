import { Card, Title } from '@/shared';
import { StructuralUnitList } from '@/widgets/StructuralUnit';

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
