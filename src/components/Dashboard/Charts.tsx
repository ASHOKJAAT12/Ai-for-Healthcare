'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import { useState, useEffect } from 'react'

const mockHabitData = [
  { day: 'Mon', completion: 85 },
  { day: 'Tue', completion: 92 },
  { day: 'Wed', completion: 78 },
  { day: 'Thu', completion: 95 },
  { day: 'Fri', completion: 88 },
  { day: 'Sat', completion: 91 },
  { day: 'Sun', completion: 84 },
]

const mockWeeklyData = [
  { week: 'W1', value: 78 },
  { week: 'W2', value: 85 },
  { week: 'W3', value: 92 },
  { week: 'W4', value: 88 },
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Daily Progress Line Chart */}
      <div className="bg-card rounded-2xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          Daily Consistency
          <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">87%</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockHabitData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={12} />
            <YAxis tickCount={4} axisLine={false} tickLine={false} tickMargin={12} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="completion" 
              stroke="#3B82F6" 
              strokeWidth={4}
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-card rounded-2xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-6">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockWeeklyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} tickMargin={12} />
            <YAxis tickCount={5} axisLine={false} tickLine={false} tickMargin={12} />
            <Tooltip />
            <Bar dataKey="value">
              {mockWeeklyData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
