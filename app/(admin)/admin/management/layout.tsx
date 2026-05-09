import { AdminNavigationConfig } from '@/features/admin';
import { MainContainer, Navigation, Title } from '@/shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Title type={'h1'} size={'l'}>
        Управление организацией
      </Title>
      <Navigation navigationItems={AdminNavigationConfig} />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
