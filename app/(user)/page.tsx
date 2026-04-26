import { Card, Title } from '@/shared';

import styles from './page.module.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/assets/lib/query-client';
import { InfoBlock } from '@/entities/user/ui';

export default function UserPage() {
  return (
    <div className={styles.pageContainer}>
      <Card>
        <Title type={'h1'} size={'m'}>
          Профиль
        </Title>
      </Card>
      <QueryClientProvider client={queryClient}>
        <InfoBlock />
      </QueryClientProvider>
    </div>
  );
}
