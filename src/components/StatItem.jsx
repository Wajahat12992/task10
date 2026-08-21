export default function StatItem({ label, value, icon }) {
  return (
    <div className="stat-item">
      <span className="stat-item__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="stat-item__value">{value}</p>
        <p className="stat-item__label">{label}</p>
      </div>
    </div>
  )
}
