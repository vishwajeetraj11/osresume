import { UserProfile } from '@clerk/clerk-react';
import React from 'react';

const UserProfilePage = () => <UserProfile path="/user" routing="path" />;

export default UserProfilePage;
