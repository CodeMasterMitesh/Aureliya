import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar.jsx'

describe('Navbar', () => {
  it('renders brand and links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText('Aureliya')).toBeInTheDocument()
    expect(screen.getAllByText('Cart')[0]).toBeInTheDocument()
  })
})
