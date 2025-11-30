Hello Backend Team,

This frontend folder contains the complete, feature-rich React application built with React + Vite. It is fully interactive and uses mock data, so you can run it immediately.

Your task is to replace all the mock (fake) logic with real API calls to your MERN backend.

How to Run This Project:

Make sure you have Node.js installed.

Open a terminal in this frontend directory.

Run npm install to install all the dependencies.

Run npm run dev to start the local development server.

Backend Handoff Checklist:

Here is a list of all the places where mock logic needs to be replaced with a fetch (or axios) call to your API.

1. Authentication (src/pages/LoginPage.jsx)

File: src/pages/LoginPage.jsx

Function: handleSubmit

Current Logic: onLogin(mockAdminUser) or onLogin(mockUserData).

To-Do: Replace this with a POST request to your /api/auth/login endpoint (Section 3.1). You should send the email and password and get back the real user object (including their role).

2. Registration (src/pages/RegisterPage.jsx)

File: src/pages/RegisterPage.jsx

Function: handleSubmit

Current Logic: onRegister({ ...mockUserData, ...formData, name: formData.name }).

To-Do: Replace this with a POST request to /api/auth/register (Section 3.1) with the formData.

3. Dashboard Data (src/pages/DashboardPage.jsx)

File: src/pages/DashboardPage.jsx

Function: DashboardPage (Top level)

Current Logic: The charts (e.g., <LineChart data={mockBiometrics.weight}>) are fed directly from mockData.js.

To-Do: Add a useEffect hook to this component. Inside, fetch data from /api/biometrics/:type (Section 3.2) and /api/progress/dashboard (Section 3.4). Save this data to React state and pass the state to the charts instead of mockBiometrics.

4. Data Logging (src/pages/LogDataPage.jsx)

File: src/pages/LogDataPage.jsx

Function: handleSubmit

Current Logic: Shows a simple alert().

To-Do: Replace this with a POST request to /api/biometrics (Section 3.2), sending the activeTab (as type) and logValue.

5. Plan Interactivity (src/pages/MyPlansPage.jsx)

File: src/pages/MyPlansPage.jsx

Function: handleWorkoutToggle and handleMealFeedback

Current Logic: Updates local React state (completedWorkouts, mealFeedback).

To-Do: Add your API calls here. handleMealFeedback should send a POST to /api/recommendations/feedback (Section 3.3).

6. Community Feed (src/pages/CommunityPage.jsx)

File: src/pages/CommunityPage.jsx

Function: handlePostSubmit

Current Logic: Adds the new post to the local React state (setPosts([newPost, ...posts])).

To-Do: Replace this. First, send a POST to /api/community/posts (Section 3.5) with the newPostText. Then, re-fetch the list of all posts from /api/community/feed to get the updated feed.

7. Expert Booking (src/components/ui/BookingModal.jsx)

File: src/components/ui/BookingModal.jsx

Function: handlePaymentSubmit

Current Logic: Calls onBookingConfirmed(...) to update the UI.

To-Do: Before calling onBookingConfirmed, add your API call here. This should be a POST request to /api/experts/:id/book (Section 3.5). You should also handle the "Common Feature" of Stripe/Razorpay integration here.

8. Goal Setting (src/pages/ProgressPage.jsx)

File: src/pages/ProgressPage.jsx

Function: handleAddGoal and handleCompleteGoal

Current Logic: Updates local React state (setGoals(...)).

To-Do: Replace this logic with POST /api/goals (Section 3.4) for handleAddGoal and PUT /api/goals/:id (Section 3.4) for handleCompleteGoal.

9. Settings (src/pages/SettingsPage.jsx)

File: src/pages/SettingsPage.jsx

Function: handleProfileSubmit and handleNotificationChange

Current Logic: Shows an alert() or logs to console.

To-Do: Replace with PUT /api/users/profile (Section 3.1) and POST /api/notifications/settings (Section 3.7).

10. Admin (src/pages/admin/UserManagementPage.jsx)

File: src/pages/admin/UserManagementPage.jsx

Function: handleDeleteUser and handleEditRole

Current Logic: Updates local state with window.confirm / window.prompt.

To-Do: Replace these with your admin API calls (e.g., DELETE /api/admin/users/:id and PUT /api/admin/users/:id/role). Also, add a useEffect to fetch the initial user list from GET /api/admin/users (Section 3.1).

Good luck!