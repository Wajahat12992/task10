export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <p>Fetching current conditions…</p>
    </div>
  )
}
