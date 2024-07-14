import { NextApiRequest, NextApiResponse } from 'next';

const applications = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, yearsOfExperience, skills } = req.body;

    if (!fullName || !email || !yearsOfExperience || !skills) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newApplication = {
      id: applications.length + 1,
      fullName,
      email,
      yearsOfExperience,
      skills,
    };

    applications.push(newApplication);

    return res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
