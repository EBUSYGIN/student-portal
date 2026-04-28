import { UserNavigationConfig } from '@/features/User';

import { MainContainer, Navigation } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation navigationItems={UserNavigationConfig} />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
