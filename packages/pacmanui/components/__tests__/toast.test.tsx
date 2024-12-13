import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, useToast } from '../toast';
import { renderHook } from '@testing-library/react-hooks';

jest.useFakeTimers();

describe('Toast Component', () => {
  it('renders with default props', () => {
    render(
      <Toast
        message="Test message"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Toast
        message="Test message"
        onClose={jest.fn()}
        className="custom-class"
      />
    );
    expect(screen.getByTestId('toast-container')).toHaveClass('custom-class');
  });

  it('handles different variants', () => {
    const { rerender } = render(
      <Toast
        message="Test message"
        onClose={jest.fn()}
        variant="success"
      />
    );
    expect(screen.getByTestId('toast-container')).toHaveClass('bg-green-50/90');

    rerender(
      <Toast
        message="Test message"
        onClose={jest.fn()}
        variant="error"
      />
    );
    expect(screen.getByTestId('toast-container')).toHaveClass('bg-red-50/90');

    rerender(
      <Toast
        message="Test message"
        onClose={jest.fn()}
        variant="warning"
      />
    );
    expect(screen.getByTestId('toast-container')).toHaveClass('bg-yellow-50/90');

    rerender(
      <Toast
        message="Test message"
        onClose={jest.fn()}
        variant="info"
      />
    );
    expect(screen.getByTestId('toast-container')).toHaveClass('bg-blue-50/90');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Toast
        message="Test message"
        onClose={onClose}
      />
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    // Wait for the exit animation to complete
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(onClose).toHaveBeenCalled();
  });

  it('auto-closes after duration', () => {
    const onClose = jest.fn();
    render(
      <Toast
        message="Test message"
        onClose={onClose}
        duration={3000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(3300); // Duration + animation time
    });

    expect(onClose).toHaveBeenCalled();
  });
});

describe('useToast Hook', () => {
  it('shows and removes toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ message: 'Test message' });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    
    const toastId = result.current.toasts[0].id;
    act(() => {
      result.current.removeToast(toastId);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  it('supports toast configuration', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({
        message: 'Test message',
        variant: 'success',
        duration: 5000,
      });
    });
    
    expect(result.current.toasts[0].variant).toBe('success');
    expect(result.current.toasts[0].duration).toBe(5000);
  });
});
