import React, { useState } from 'react';
import { CreditCard, ChevronLeft } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';

const BookingModal = ({ isOpen, onClose, expert, onBookingConfirmed }) => {
  const [step, setStep] = useState(1); // 1: Schedule, 2: Payment
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate next 7 days dynamically
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    const options = { month: 'short', day: 'numeric' }; 
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toLocaleDateString('en-US', options));
    }
    return days;
  };
  const availableDates = getNextSevenDays();

  // Mock time slots for the "calendar"
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const goToPayment = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    } else {
      alert("Please select a date and time."); // Simple validation
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting payment for:", { expert: expert.name, date: selectedDate, time: selectedTime });
    
    // This passes the booking details back up to the App
    // API Call: POST /api/experts/:id/book (Section 3.5)
    onBookingConfirmed(expert, selectedDate, selectedTime);
    
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title={step === 1 ? `Book ${expert.name}` : "Confirm & Pay"}
    >
      {/* Step 1: Scheduling (Section 2.5) */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600">Select a date and time for your consultation.</p>
          <p className="text-lg font-semibold">Cost: ${expert.cost} / session</p>
          
          {/* Mock Calendar */}
          <div>
            <h4 className="font-medium text-gray-800">Date</h4>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`rounded-md p-2 text-sm ${selectedDate === date ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots (only show if date is selected) */}
          {selectedDate && (
            <div>
              <h4 className="font-medium text-gray-800">Time (on {selectedDate})</h4>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`rounded-md p-2 text-sm ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
            <Button variant="primary" onClick={goToPayment} disabled={!selectedDate || !selectedTime}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Payment (Common Features: Stripe/Razorpay) */}
      {step === 2 && (
        <form className="space-y-4" onSubmit={handlePaymentSubmit}>
          <button type="button" onClick={() => setStep(1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" /> Back to Schedule
          </button>
          
          <div className="rounded-md bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-800">Booking Summary</h4>
            <p className="text-gray-600">Consultation with <span className="font-medium">{expert.name}</span></p>
            <p className="text-gray-600">On <span className="font-medium">{selectedDate}</span> at <span className="font-medium">{selectedTime}</span></p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Total: ${expert.cost}</p>
          </div>

          <h4 className="text-lg font-medium text-gray-800">Payment Details</h4>
          <p className="text-sm text-gray-500">Mock Stripe / Razorpay Form</p>
          
          <Input id="cardName" label="Name on Card" type="text" placeholder="Alex Johnson" required />
          <Input id="cardNumber" label="Card Number" type="text" icon={CreditCard} placeholder="•••• •••• •••• 1234" required />
          <div className="grid grid-cols-2 gap-4">
            <Input id="expiry" label="Expiry Date" type="text" placeholder="MM / YY" required />
            <Input id="cvc" label="CVC" type="text" placeholder="123" required />
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" variant="primary">
              Confirm & Pay $${expert.cost}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;