import { Card, Title } from '@/shared';
import { RequestList } from '@/widgets';

export default function AdminPage() {
  return (
    <>
      <Card>
        <Title type={'h1'} size={'m'}>
          Заявки на подключение
        </Title>
        <RequestList />
      </Card>
    </>
  );
}
