import React, { useState } from 'react';
import { Weight, Moon, Heart, Droplet, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LogDataPage = () => {
  const [activeTab, setActiveTab] = useState('weight');
  const [logValue, setLogValue] = useState('');

  const tabs = [
    { id: 'weight', label: 'Weight', icon: Weight, unit: 'kg' },
    { id: 'sleep', label: 'Sleep', icon: Moon, unit: 'hrs' },
    { id: 'heartRate', label: 'Heart Rate', icon: Heart, unit: 'bpm' },
    { id: 'bp', label: 'Blood Pressure', icon: Droplet, unit: 'mmHg' },
    { id: 'steps', label: 'Steps', icon: Zap, unit: 'steps' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging ${activeTab}: ${logValue}`);
    // This is where you'd call your backend API:
    // API Call: POST /api/biometrics (Section 3.2)
    alert(`Logged ${logValue} ${tabs.find(t => t.id === activeTab).unit} for ${tabs.find(t => t.id === activeTab).label}.`);
    setLogValue('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Log Biometric Data</h1>
      <p className="text-gray-600">
        Manually log your health data. For automatic logging, connect your devices
        in the (future) Settings page.
      </p>

      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <tab.icon className="inline-block h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Log {tabs.find(t => t.id === activeTab).label}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Input
              id="logValue"
              label={`Enter value (${tabs.find(t => t.id === activeTab).unit})`}
              type={activeTab === 'bp' ? 'text' : 'number'}
              value={logValue}
              onChange={(e) => setLogValue(e.target.value)}
              placeholder={activeTab === 'bp' ? 'e.g., 120/80' : 'e.g., 75.5'}
              required
              className="flex-1"
            />
            <Button type="submit" variant="primary" className="sm:mt-6">
              Save Log
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LogDataPage;