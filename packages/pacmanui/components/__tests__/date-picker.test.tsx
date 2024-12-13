import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { DatePicker } from '../date-picker'

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker selectedDate={null} onChange={() => {}} />)
    expect(screen.getByTestId('date-picker-container')).toBeInTheDocument()
  })

  it('opens calendar on button click', () => {
    render(<DatePicker selectedDate={null} onChange={() => {}} />)
    fireEvent.click(screen.getByTestId('date-picker-button'))
    expect(screen.getByTestId('date-picker-popup')).toBeInTheDocument()
  })

  it('displays selected date', () => {
    const date = new Date('2023-01-01')
    render(<DatePicker selectedDate={date} onChange={() => {}} />)
    expect(screen.getByTestId('date-picker-button')).toHaveTextContent('1/1/2023')
  })

  it('calls onChange when a date is selected', () => {
    const handleChange = jest.fn()
    render(<DatePicker selectedDate={null} onChange={handleChange} />)
    
    // Open calendar
    fireEvent.click(screen.getByTestId('date-picker-button'))
    
    // Click on a date (assuming it's visible)
    const dateButton = screen.getByTestId('date-15')
    fireEvent.click(dateButton)
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('navigates between months', () => {
    const date = new Date('2023-01-01')
    render(<DatePicker selectedDate={date} onChange={() => {}} />)
    
    // Open calendar
    fireEvent.click(screen.getByTestId('date-picker-button'))
    
    // Initial month should be January 2023
    expect(screen.getByTestId('current-month')).toHaveTextContent('January 2023')
    
    // Click next month
    fireEvent.click(screen.getByTestId('next-month-button'))
    expect(screen.getByTestId('current-month')).toHaveTextContent('February 2023')
    
    // Click previous month
    fireEvent.click(screen.getByTestId('prev-month-button'))
    expect(screen.getByTestId('current-month')).toHaveTextContent('January 2023')
  })

  it('closes calendar when clicking outside', async () => {
    render(<DatePicker selectedDate={null} onChange={() => {}} />)
    
    // Open calendar
    fireEvent.click(screen.getByTestId('date-picker-button'))
    expect(screen.getByTestId('date-picker-popup')).toBeInTheDocument()
    
    // Click outside
    fireEvent.mouseDown(document.body)
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 300))
    
    expect(screen.queryByTestId('date-picker-popup')).not.toBeInTheDocument()
  })

  it('respects disabled prop', () => {
    render(<DatePicker selectedDate={null} onChange={() => {}} disabled />)
    
    const button = screen.getByTestId('date-picker-button')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(screen.queryByTestId('date-picker-popup')).not.toBeInTheDocument()
  })
})
