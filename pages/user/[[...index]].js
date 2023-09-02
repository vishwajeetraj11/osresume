import { UserProfile } from '@clerk/nextjs';
import React from 'react';

const UserProfilePage = () => <UserProfile path="/user" routing="path" />;

export default UserProfilePage;
