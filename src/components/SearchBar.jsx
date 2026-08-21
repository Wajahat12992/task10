import { useState } from 'react'

export default function SearchBar({ onSearch, isLoading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim() || isLoading) return
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search a city — e.g. Lahore, Tokyo, Berlin"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="City name"
        autoFocus
      />
      <button
        type="submit"
        className="search-bar__button"
        disabled={isLoading || !value.trim()}
      >
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}
