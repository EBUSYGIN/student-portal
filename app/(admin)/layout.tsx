import { AdminNavigationConfig } from '@/features/Admin';
import { MainContainer, Navigation } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation navigationItems={AdminNavigationConfig} />
      <MainContainer>{children}</MainContainer>
    </div>
  );
}
