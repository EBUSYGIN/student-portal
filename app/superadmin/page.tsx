import { Card, Title } from '@/shared';
import { OrganizationList } from '@/widgets/Organization';

export default function SuperAdminPage() {
  return (
    <Card>
      <Title type={'h2'} size={'s'}>
        Управление организациями
      </Title>
      <OrganizationList />
    </Card>
  );
}
