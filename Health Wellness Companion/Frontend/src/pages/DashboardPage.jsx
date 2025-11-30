import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Zap, Moon, Heart, Droplet, Calendar } from 'lucide-react';
import { mockBiometrics, mockAchievements } from '../data/mockData';
import Card from '../components/ui/Card';
import DashboardStatCard from '../components/ui/DashboardStatCard';

const DashboardPage = ({ upcomingBookings }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">
      Welcome back, Alex!
    </h1>
    
    {/* --- NEW: Upcoming Appointments Card --- */}
    {upcomingBookings && upcomingBookings.length > 0 && (
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {upcomingBookings.map(booking => (
            <div key={booking.id} className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{booking.expertName} - <span className="text-gray-600 font-normal">{booking.specialty}</span></p>
                <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )}
    {/* --- END NEW --- */}

    {/* Stats Grid (Section 2.4) */}
    {/* TODO: Add useEffect to fetch this from /api/biometrics/summary (Section 3.2) */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardStatCard title="Today's Steps" value={mockBiometrics.steps.toLocaleString()} icon={Zap} color="bg-yellow-500" />
      <DashboardStatCard title="Avg. Sleep" value={`${mockBiometrics.sleep[mockBiometrics.sleep.length - 1].value.toFixed(1)} hrs`} icon={Moon} color="bg-blue-500" />
      <DashboardStatCard title="Heart Rate" value={`${mockBiometrics.heartRate} bpm`} icon={Heart} color="bg-red-500" />
      <DashboardStatCard title="Blood Pressure" value={mockBiometrics.bloodPressure} icon={Droplet} color="bg-purple-500" />
    </div>

    {/* Charts (Section 2.4) - Using Recharts as specified */}
    {/* TODO: Add useEffect to fetch this from /api/biometrics/:type (Section 3.2) */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <h3 className="text-lg font-medium text-gray-900">Weight Tracking (Last 7 Days)</h3>
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer>
            <LineChart data={mockBiometrics.weight}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-medium text-gray-900">Sleep Duration (Last 7 Days)</h3>
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer>
            <BarChart data={mockBiometrics.sleep}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Sleep (hrs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Achievements (Section 2.6 - Gamification) */}
    {/* TODO: Add useEffect to fetch this from /api/gamification/badges (Section 3.6) */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Achievements</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockAchievements.map((ach) => (
          <Card key={ach.id}>
            <div className="flex items-center space-x-3">
              <ach.icon className="h-8 w-8 text-yellow-500" />
              <div>
                <h4 className="font-semibold text-gray-800">{ach.title}</h4>
                <p className="text-sm text-gray-500">{ach.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardPage;