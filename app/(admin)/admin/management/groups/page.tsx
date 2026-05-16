import { GroupList } from '@/widgets/Group';
import { Card, Title } from '@/shared';

export default function GroupsPage() {
  return (
    <>
      <Card>
        <Title type={'h2'} size={'s'}>
          Учебные группы
        </Title>
        <GroupList />
      </Card>
    </>
  );
}
