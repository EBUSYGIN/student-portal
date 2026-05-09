import { Header } from '@/widgets';

import { QueryProvider } from '@/app/Providers/QueryProvider';
import { UserNavigationConfig } from '@/features/user';

import { MainContainer, Navigation } from '@/shared';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div>
        <Header />
        <div className={styles.content}>
          <Navigation navigationItems={UserNavigationConfig} />
          <MainContainer>{children}</MainContainer>
        </div>
      </div>
    </QueryProvider>
  );
}
