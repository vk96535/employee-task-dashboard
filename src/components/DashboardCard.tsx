import React from 'react'

type DashboardCardProps = {
  title: string
  count: number
}

function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center w-full sm:w-72 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        {title}
      </h2>

      <p className="text-4xl font-bold text-blue-600">
        {count}
      </p>
    </div>
  )
}

export default React.memo(DashboardCard)