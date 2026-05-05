import { Header } from '@/widgets';

import { UserNavigationConfig } from '@/features/user';

import { MainContainer, Navigation } from '@/shared';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Navigation navigationItems={UserNavigationConfig} />
        <MainContainer>{children}</MainContainer>
      </div>
    </div>
  );
}
