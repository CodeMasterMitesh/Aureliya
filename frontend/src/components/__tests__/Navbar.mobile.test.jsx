import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/Navbar.jsx'

describe('Navbar mobile menu', () => {
  it('toggles aria-expanded on menu button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })
})
