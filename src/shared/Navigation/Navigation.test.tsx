import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Navigation } from './Navigation';

const usePathnameMock = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('Navigation', () => {
  it('renders navigation links', () => {
    usePathnameMock.mockReturnValue('/profile');

    render(
      <Navigation
        navigationItems={[
          { name: 'Profile', href: '/profile' },
          { name: 'Settings', href: '/settings' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveProperty(
      'href',
      'http://localhost:3000/profile',
    );
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveProperty(
      'href',
      'http://localhost:3000/settings',
    );
  });

  it('marks current route as active', () => {
    usePathnameMock.mockReturnValue('/settings');

    render(
      <Navigation
        navigationItems={[
          { name: 'Profile', href: '/profile' },
          { name: 'Settings', href: '/settings' },
        ]}
      />,
    );

    const activeLink = screen.getByRole('link', { name: 'Settings' });
    const inactiveLink = screen.getByRole('link', { name: 'Profile' });

    expect(activeLink.className).toContain('active');
    expect(inactiveLink.className).not.toContain('active');
  });

  it('marks parent route as active for nested paths', () => {
    usePathnameMock.mockReturnValue('/admin/management/structural-units/details');

    render(
      <Navigation
        navigationItems={[
          {
            name: 'Structural units',
            href: '/admin/management/structural-units',
          },
          { name: 'Groups', href: '/admin/management/groups' },
        ]}
      />,
    );

    const activeLink = screen.getByRole('link', { name: 'Structural units' });
    const inactiveLink = screen.getByRole('link', { name: 'Groups' });

    expect(activeLink.className).toContain('active');
    expect(inactiveLink.className).not.toContain('active');
  });
});
