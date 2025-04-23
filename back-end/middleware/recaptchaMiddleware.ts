import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const verifyCaptcha = async (req: Request, res: Response, next: NextFunction) => {
  const { captcha } = req.body;

  if (!captcha) {
    return res.status(400).json({ message: 'Please complete the CAPTCHA' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`
    );

    if (response.data.success) {
      console.log('CAPTCHA verification successful');
      next();
    } else {
      console.error('CAPTCHA verification failed:', response.data['error-codes']);
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({ message: 'CAPTCHA verification error' });
  }
};

export { verifyCaptcha };
