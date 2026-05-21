import React from 'react'

type DashboardCardProps = {
  title: string
  count: number
}

function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  )
}

export default React.memo(DashboardCard)