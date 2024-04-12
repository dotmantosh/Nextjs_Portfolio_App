import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '../authService'; // Update with the correct path to AuthService

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;
  console.log(req.body)
  try {
    // Call the AuthService to login
    const { user, token } = (await AuthService.LoginUser({ email, password })).data;

    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    // Assuming AuthService.LoginUser returns user and token
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
}