import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Accordion } from '../accordion';

describe('Accordion', () => {
  const mockItems = [
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
  ];

  it('renders all accordion items', () => {
    render(<Accordion items={mockItems} />);
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('expands/collapses items on click', async () => {
    render(<Accordion items={mockItems} />);
    
    // Initially, content should not be in the document
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    
    // Click the first section
    fireEvent.click(screen.getByText('Section 1'));
    
    // Content should now be in the document
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(screen.getByText('Section 1'));
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('allows multiple sections to be open when allowMultiple is true', () => {
    render(<Accordion items={mockItems} allowMultiple={true} />);
    
    // Open both sections
    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));
    
    // Both contents should be in the document
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('closes previously opened section when allowMultiple is false', async () => {
    render(<Accordion items={mockItems} allowMultiple={false} />);
    
    // Open first section
    fireEvent.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Open second section
    fireEvent.click(screen.getByText('Section 2'));
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    }, { timeout: 1000 });
    
    // Second section should be open
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
