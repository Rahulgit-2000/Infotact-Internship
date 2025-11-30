import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import BookingModal from '../components/ui/BookingModal';

const ExpertsPage = ({ handleNewBooking }) => {
  // TODO: Add useEffect to fetch experts from /api/experts/search (Section 3.5)
  const [experts, setExperts] = useState([
    { id: 'e1', name: 'Dr. Sarah Chen', specialty: 'Nutritionist', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=SC', cost: 150 },
    { id: 'e2', name: 'David Lee', specialty: 'Personal Trainer', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=DL', cost: 100 },
    { id: 'e3', name: 'Dr. Emily White', specialty: 'Sports Psychologist', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=EW', cost: 180 },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpert, setNewExpert] = useState({
    name: '',
    specialty: '',
    avatar: '',
    cost: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const openBookingModal = (expert) => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
  };

  const handleNewExpertChange = (e) => {
    const { name, value } = e.target;
    setNewExpert(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpertSubmit = (e) => {
    e.preventDefault();
    const expertToAdd = {
      id: `e${experts.length + 1}-${newExpert.name}`, // simple unique id
      ...newExpert,
      cost: parseInt(newExpert.cost) || 0, // Ensure cost is a number
      avatar: newExpert.avatar || `https://placehold.co/100x100/E2E8F0/4A5568?text=${newExpert.name.charAt(0) || 'E'}`
    };
    
    // TODO: This should be an ADMIN-only action, API call
    setExperts([...experts, expertToAdd]); // Add new expert to the list
    
    setNewExpert({ name: '', specialty: '', avatar: '', cost: '' });
    setShowAddForm(false);
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Expert Network</h1>
      <p className="text-gray-600">Connect with certified nutritionists, personal trainers, and wellness coaches.</p>
      <div className="relative">
        <Input id="expert-search" label="Find an expert" type="search" placeholder="Search by name or specialty (e.g., 'Nutritionist')" />
      </div>

      <div className="text-right">
        <Button onClick={() => setShowAddForm(!showAddForm)} variant={showAddForm ? "outline" : "primary"}>
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? 'Cancel' : 'Add New Expert'}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Expert</h3>
          <form className="space-y-4" onSubmit={handleAddExpertSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="Dr. John Doe"
                value={newExpert.name}
                onChange={handleNewExpertChange}
                required
              />
              <Input
                id="specialty"
                name="specialty"
                label="Specialty"
                type="text"
                placeholder="Nutritionist"
                value={newExpert.specialty}
                onChange={handleNewExpertChange}
                required
              />
              <Input
                id="cost"
                name="cost"
                label="Cost per Session ($)"
                type="number"
                placeholder="120"
                value={newExpert.cost}
                onChange={handleNewExpertChange}
                required
              />
              <Input
                id="avatar"
                name="avatar"
                label="Avatar Image URL (Optional)"
                type="text"
                placeholder="https://..."
                value={newExpert.avatar}
                onChange={handleNewExpertChange}
              />
            </div>
            <div className="text-right">
              <Button type="submit" variant="primary">Save Expert</Button>
            </div>
          </form>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map(expert => (
          <Card key={expert.id} className="text-center">
            <img src={expert.avatar} alt="expert" className="mx-auto h-24 w-24 rounded-full" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{expert.name}</h3>
            <p className="text-green-600">{expert.specialty}</p>
            <p className="text-sm text-gray-500">${expert.cost}/session</p>
            <Button variant="primary" className="mt-4" onClick={() => openBookingModal(expert)}>
              Book Consultation
            </Button>
          </Card>
        ))}
      </div>

      {selectedExpert && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeBookingModal}
          expert={selectedExpert}
          onBookingConfirmed={handleNewBooking} 
        />
      )}
    </div>
  );
};

export default ExpertsPage;