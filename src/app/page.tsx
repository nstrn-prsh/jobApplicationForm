"use client";

import { NextPage } from 'next';
import JobApplicationForm from './components/JobApplicationForm';
import DarkModeToggle from './components/DarkModeToggle';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle />
      <JobApplicationForm />
    </div>
  );
};

export default Home;
