import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/Navbar.jsx'

function clickToggle() {
  const btn = screen.getByRole('button', { name: /toggle dark mode/i })
  fireEvent.click(btn)
}

describe('Navbar dark mode toggle', () => {
  it('toggles documentElement dark class', () => {
    // ensure clean state
    document.documentElement.classList.remove('dark')

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const root = document.documentElement
    const initial = root.classList.contains('dark')
    clickToggle()
    expect(root.classList.contains('dark')).toBe(!initial)
  })
})
