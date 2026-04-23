import { AdminNavigationConfig } from '@/assets/config/navigation/navigation.config';
import { Navigation } from '@/features';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation navigationItems={AdminNavigationConfig} />
      {children}
    </div>
  );
}
