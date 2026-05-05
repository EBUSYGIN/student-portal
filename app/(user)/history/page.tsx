import { Certificate } from '@/entities/user/ui';
import { Card, Title } from '@/shared';

export default function HistoryPage() {
  return (
    <>
      <Card>
        <Title type={'h1'} size={'m'}>
          История заявлений и справок
        </Title>
        <Certificate />
        <Certificate />
        <Certificate />
      </Card>
    </>
  );
}
