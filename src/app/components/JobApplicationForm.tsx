"use client";

import React, { useState } from 'react';
import { useFormStore } from '../stores/formStore';

const skillsOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
];

const JobApplicationForm: React.FC = () => {
  const {
    fullName,
    email,
    yearsOfExperience,
    skills,
    setFullName,
    setEmail,
    setYearsOfExperience,
    setSkills,
  } = useFormStore();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSkillChange = (skill: string) => {
    setSkills(
      skills.includes(skill)
        ? skills.filter((s) => s !== skill)
        : [...skills, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic form validation
    if (!fullName || !email || !yearsOfExperience || skills.length === 0) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, yearsOfExperience, skills }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();

      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-2">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="block mb-2">Years of Experience</label>
          <input
            id="yearsOfExperience"
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Skills</label>
          {skillsOptions.map((skill) => (
            <div key={skill} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={skill}
                checked={skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="mr-2"
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 dark:bg-indigo-600 dark:hover:bg-indigo-700"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md">
          <h2 className="text-xl font-bold mb-2">Submitted Data</h2>
          <p>Full Name: {fullName}</p>
          <p>Email: {email}</p>
          <p>Years of Experience: {yearsOfExperience}</p>
          <p>Skills: {skills.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
