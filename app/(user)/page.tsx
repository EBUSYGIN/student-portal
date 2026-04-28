import { Card, Title } from '@/shared';
import { QueryProvider } from '@/app/Providers/QueryProvider';

import styles from './page.module.css';
import { UserInfo } from '@/widgets';

export default function UserPage() {
  return (
    <div className={styles.pageContainer}>
      <Card>
        <Title type={'h1'} size={'m'}>
          Профиль
        </Title>
      </Card>
      <QueryProvider>
        <UserInfo />
      </QueryProvider>
    </div>
  );
}
