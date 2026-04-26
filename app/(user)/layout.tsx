import { UserNavigationConfig } from '@/assets/config/navigation/navigation.config';
import { Navigation } from '@/features/User';

import { MainContainer } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation navigationItems={UserNavigationConfig} />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
