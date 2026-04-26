import { AdminNavigationConfig } from '@/assets/config/navigation/navigation.config';

import { Navigation } from '@/features';
import { MainContainer } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation navigationItems={AdminNavigationConfig} />
      <MainContainer>{children}</MainContainer>
    </div>
  );
}
