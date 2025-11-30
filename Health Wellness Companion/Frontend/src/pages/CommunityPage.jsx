import React, { useState } from 'react';
import { mockCommunityPosts, mockCommunityGroups } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CommunityPage = ({ user }) => {
  const [posts, setPosts] = useState(mockCommunityPosts);
  const [newPostText, setNewPostText] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return; // Don't post empty strings

    const newPost = {
      id: `p${posts.length + 1}-${Date.now()}`, // More unique ID
      user: user.name, // Use logged-in user's name
      avatar: `https://placehold.co/100x100/E2E8F0/4A5568?text=${user.name.charAt(0)}`,
      text: newPostText,
      likes: 0,
      comments: 0,
    };

    // API Call: POST /api/community/posts (Section 3.5)
    // After successful post, you would re-fetch the feed
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Feed Section */}
        {/* TODO: Add useEffect to fetch posts from /api/community/feed (Section 3.5) */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-900">Activity Feed</h2>
          
          <Card>
            <form onSubmit={handlePostSubmit}>
              <textarea 
                className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500" 
                rows="3" 
                placeholder="Share your progress..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />
              <div className="mt-2 text-right">
                <Button type="submit" variant="primary">Post</Button>
              </div>
            </form>
          </Card>
          
          {posts.map(post => (
            <Card key={post.id}>
              <div className="flex space-x-3">
                <img src={post.avatar} alt="avatar" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-900">{post.user}</p>
                  <p className="text-gray-700">{post.text}</p>
                  <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                    <span>{post.likes} Likes</span><span>{post.comments} Comments</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Groups Section (static) */}
        {/* TODO: Add useEffect to fetch groups from /api/groups (Section 3.5) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Discover Groups</h2>
          {mockCommunityGroups.map(group => (
            <Card key={group.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <group.icon className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-gray-900">{group.name}</p>
                    <p className="text-sm text-gray-500">{group.members} members</p>
                  </div>
                </div>
                <Button variant="secondary" className="px-3 py-1 text-sm">Join</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;