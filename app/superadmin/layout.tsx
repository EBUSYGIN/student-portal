import { QueryProvider } from '@/app/Providers/QueryProvider';
import { Header } from '@/widgets';

import styles from './layout.module.css';
import { MainContainer } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div>
        <Header />
        <div className={styles.content}>
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </QueryProvider>
  );
}
