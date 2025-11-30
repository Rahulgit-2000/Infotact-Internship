import React, { useState } from 'react';
import { Mail, Lock, User, Info, Ruler, Weight, Activity, Apple, Target } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const RegisterPage = ({ onRegister, onSetPage }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    email: '',
    password: '',
    // Step 2 (Demographics)
    name: '',
    age: '',
    gender: 'Male',
    // Step 3 (Physical Attributes)
    height: '',
    weight: '',
    activityLevel: 'Sedentary',
    // Step 4 (Goals & Preferences)
    goals: [],
    dietaryPreferences: '', // Using text for simplicity
    allergies: '', // Using text for simplicity
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e, field) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 4) {
      console.log('Registering user:', formData);
      // In a real app, call your backend API:
      // API Call: POST /api/auth/register (Section 3.1)
      onRegister({ ...formData, name: formData.name });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <Card className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your health profile
          </h2>
          
          {/* Progress Bar for multi-step form */}
          <div className="flex items-center my-8">
            {['Account', 'Personal', 'Physical', 'Goals'].map((name, index) => (
              <React.Fragment key={name}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      index + 1 <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className={`mt-2 text-center text-sm ${index + 1 <= step ? 'text-green-600' : 'text-gray-500'}`}>{name}</p>
                </div>
                {index < 3 && (
                  <div className={`flex-1 border-t-2 ${index + 1 < step ? 'border-green-600' : 'border-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Step 1: Account Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Step 1: Account Details</h3>
                <Input id="email" name="email" label="Email address" type="email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                <Input id="password" name="password" label="Password" type="password" icon={Lock} value={formData.password} onChange={handleChange} placeholder="••••••••" required />
              </div>
            )}
            {/* Step 2: Personal Info (Demographics) */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Step 2: Personal Info</h3>
                <Input id="name" name="name" label="Full Name" type="text" icon={User} value={formData.name} onChange={handleChange} placeholder="Alex Johnson" required />
                <Input id="age" name="age" label="Age" type="number" icon={Info} value={formData.age} onChange={handleChange} placeholder="29" required />
                <Select id="gender" name="gender" label="Gender" icon={User} value={formData.gender} onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </Select>
              </div>
            )}
            {/* Step 3: Physical Attributes */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Step 3: Physical Attributes</h3>
                <Input id="height" name="height" label="Height (cm)" type="number" icon={Ruler} value={formData.height} onChange={handleChange} placeholder="180" required />
                <Input id="weight" name="weight" label="Weight (kg)" type="number" icon={Weight} value={formData.weight} onChange={handleChange} placeholder="75" required />
                <Select id="activityLevel" name="activityLevel" label="Activity Level" icon={Activity} value={formData.activityLevel} onChange={handleChange}>
                  <option>Sedentary (little or no exercise)</option>
                  <option>Light (light exercise/sports 1-3 days/week)</option>
                  <option>Active (moderate exercise/sports 3-5 days/week)</option>
                  <option>Very Active (hard exercise/sports 6-7 days a week)</option>
                </Select>
              </div>
            )}
            {/* Step 4: Goals & Preferences */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Step 4: Goals & Preferences</h3>
                <Select id="goals" name="goals" label="Health Goals (Hold Ctrl/Cmd to select multiple)" icon={Target} value={formData.goals} onChange={(e) => handleMultiSelect(e, 'goals')} multiple className="h-32">
                  <option>Lose Weight</option><option>Gain Muscle</option><option>Improve Sleep</option><option>Reduce Stress</option><option>Eat Healthier</option>
                </Select>
                <Input id="dietaryPreferences" name="dietaryPreferences" label="Dietary Preferences (comma separated)" type="text" icon={Apple} value={formData.dietaryPreferences} onChange={handleChange} placeholder="Low Carb, Vegetarian" />
                <Input id="allergies" name="allergies" label="Allergies (comma separated)" type="text" icon={Info} value={formData.allergies} onChange={handleChange} placeholder="Peanuts, Shellfish" />
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={prevStep} className={step === 1 ? 'invisible' : ''}>Back</Button>
              {step < 4 ? <Button type="button" variant="primary" onClick={nextStep}>Next</Button> : <Button type="submit" variant="primary">Finish & Sign Up</Button>}
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => onSetPage('login')} className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;