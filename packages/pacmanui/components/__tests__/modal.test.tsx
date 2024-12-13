import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Modal, useModal } from '../modal';
import { renderHook } from '@testing-library/react-hooks';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Title"
        description="Test Description"
      >
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('max-w-sm');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('max-w-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} variant="destructive">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('bg-red-50');

    rerender(
      <Modal isOpen={true} onClose={() => {}} variant="success">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('bg-green-50');
  });

  it('shows close button by default', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('hides close button when showClose is false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showClose={false}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside if closeOnOutsideClick is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOutsideClick={true}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking outside if closeOnOutsideClick is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOutsideClick={false}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-class">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('custom-class');
  });
});

describe('useModal', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('initializes with custom default state', () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('opens modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('closes modal', () => {
    const { result } = renderHook(() => useModal(true));
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles modal state', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
