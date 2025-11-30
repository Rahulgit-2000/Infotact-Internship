import React, { useState } from 'react';
import { User, Mail, Info, Ruler, Weight, Activity, Apple } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ToggleSwitch from '../components/ui/ToggleSwitch';

const SettingsPage = ({ user }) => {
  // State for profile form (pre-filled with user data)
  // TODO: Add useEffect to fetch this from /api/auth/me (Section 3.1)
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    age: user.age || '',
    height: user.height || '',
    weight: user.weight || '',
    activityLevel: user.activityLevel || 'Sedentary',
    dietaryPreferences: user.dietaryPreferences || '',
    allergies: user.allergies || '',
  });

  // State for notification toggles (Section 2.7)
  // TODO: Add useEffect to fetch this from /api/notifications/settings (Section 3.7)
  const [notifications, setNotifications] = useState({
    workout: true,
    meal: true,
    mindfulness: false,
    community: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Updating profile:", profile);
    // API Call: PUT /api/users/profile (Section 3.1)
    alert("Profile updated!");
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      console.log("Updating notification settings:", newSettings);
      // API Call: POST /api/notifications/settings (Section 3.7)
      return newSettings;
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* --- Profile Management (Section 2.1) --- */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Health Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="name" name="name" label="Full Name" type="text" icon={User} value={profile.name} onChange={handleProfileChange} />
            <Input id="email" name="email" label="Email" type="email" icon={Mail} value={profile.email} onChange={handleProfileChange} disabled />
            <Input id="age" name="age" label="Age" type="number" icon={Info} value={profile.age} onChange={handleProfileChange} />
            <Input id="height" name="height" label="Height (cm)" type="number" icon={Ruler} value={profile.height} onChange={handleProfileChange} />
            <Input id="weight" name="weight" label="Weight (kg)" type="number" icon={Weight} value={profile.weight} onChange={handleProfileChange} />
            <Select id="activityLevel" name="activityLevel" label="Activity Level" icon={Activity} value={profile.activityLevel} onChange={handleProfileChange}>
              <option>Sedentary (little or no exercise)</option>
              <option>Light (light exercise/sports 1-3 days/week)</option>
              <option>Active (moderate exercise/sports 3-5 days/week)</option>
              <option>Very Active (hard exercise/sports 6-7 days a week)</option>
            </Select>
            <Input id="dietaryPreferences" name="dietaryPreferences" label="Dietary Preferences (comma separated)" type="text" icon={Apple} value={profile.dietaryPreferences} onChange={handleProfileChange} />
            <Input id="allergies" name="allergies" label="Allergies (comma separated)" type="text" icon={Info} value={profile.allergies} onChange={handleProfileChange} />
          </div>
          <div className="text-right">
            <Button type="submit" variant="primary">Save Profile</Button>
          </div>
        </form>
      </Card>

      {/* --- Biometric Data Integration (Section 2.2) --- */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Integrations</h2>
        <p className="text-gray-600 mb-4">Connect your wearable devices to sync data automatically.</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* API Call: GET /api/integrations/fitbit/auth (example) */}
          <Button variant="outline" className="w-full justify-center">
            <img src="https://placehold.co/24x24/00B0B9/FFFFFF?text=F" alt="Fitbit" className="mr-2 h-6 w-6" /> Connect to Fitbit
          </Button>
          <Button variant="outline" className="w-full justify-center">
            <img src="https://placehold.co/24x24/EA4335/FFFFFF?text=G" alt="Google" className="mr-2 h-6 w-6" /> Connect to Google Fit
          </Button>
          <Button variant="outline" className="w-full justify-center">
            <img src="https://placehold.co/24x24/000000/FFFFFF?text=A" alt="Apple" className="mr-2 h-6 w-6" /> Connect to Apple Health
          </Button>
        </div>
      </Card>

      {/* --- Notification Preferences (Section 2.7) --- */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <ToggleSwitch
            id="workout-notifications"
            label="Workout reminders"
            enabled={notifications.workout}
            setEnabled={() => handleNotificationChange('workout')}
          />
          <ToggleSwitch
            id="meal-notifications"
            label="Meal reminders"
            enabled={notifications.meal}
            setEnabled={() => handleNotificationChange('meal')}
          />
          <ToggleSwitch
            id="mindfulness-notifications"
            label="Mindfulness reminders"
            enabled={notifications.mindfulness}
            setEnabled={() => handleNotificationChange('mindfulness')}
          />
          <ToggleSwitch
            id="community-notifications"
            label="Community activity (new posts, etc.)"
            enabled={notifications.community}
            setEnabled={() => handleNotificationChange('community')}
          />
        </div>
      </Card>

      {/* --- Account Actions --- */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account</h2>
        <Button variant="danger">Delete My Account</Button>
        <p className="text-sm text-gray-500 mt-2">This action is permanent and cannot be undone.</p>
      </Card>
    </div>
  );
};

export default SettingsPage;