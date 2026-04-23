import { UserNavigationConfig } from '@/assets/config/navigation/navigation.config';
import { Navigation } from '@/features';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation navigationItems={UserNavigationConfig} />
      {children}
    </div>
  );
}
