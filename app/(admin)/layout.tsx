import { AdminHeaderNavigation } from '@/features/admin/config/navigation.config';
import { QueryProvider } from '@/app/Providers/QueryProvider';
import { Header } from '@/widgets';

import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div>
        <Header navigationConfig={AdminHeaderNavigation} />
        <div className={styles.content}>{children}</div>
      </div>
    </QueryProvider>
  );
}
