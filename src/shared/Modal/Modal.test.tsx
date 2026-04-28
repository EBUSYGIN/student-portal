import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

vi.mock('../Icon/Icon', () => ({
  Icon: {
    Close: () => <svg data-testid='close-icon' />,
  },
}));

describe('Modal', () => {
  it('renders title and children when open', () => {
    render(
      <Modal isOpen setIsOpen={vi.fn()} title='Add parent'>
        Form content
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Add parent')).toBeDefined();
    expect(screen.getByText('Form content')).toBeDefined();
  });

  it('does not render dialog content when closed', () => {
    render(
      <Modal isOpen={false} setIsOpen={vi.fn()} title='Hidden modal'>
        Hidden content
      </Modal>,
    );

    expect(screen.queryByText('Hidden content')).toBeNull();
  });

  it('calls setIsOpen with false when close button is clicked', () => {
    const setIsOpen = vi.fn();

    render(
      <Modal isOpen setIsOpen={setIsOpen}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
