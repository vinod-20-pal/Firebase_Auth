import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Account from '../models/Account';
import { sendEmail } from '../service/emailService';

export class AccountController {
  static createAccount = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, phone, password, birthday } = req.body;
    try {
      const accountDetail = await Account.findOne({ where: { email } });
      if (accountDetail) {
        return res.status(401).json({ message: 'Email Already Exist' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const account = await Account.create({
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        birthday,
        created_at: new Date(),
        last_modified: new Date()
      })
      const html = `<h1>First Name</h1>:${first_name}<br><h1>Last Name</h1>:${last_name}<br><h1>Email</h1>:${email}<br><h1>Phone</h1>:${phone}<br><h1>Password</h1>:${password}<br><h1>Birthday</h1>:${birthday}<br>`
      await sendEmail(email, 'Account Created', 'You have successfully Created Account.',html);
      res.status(201).json({ message: 'Account created successfully', account });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  static getAccounts = async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const accounts = await Account.findAll({ limit });
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  static updateAccount = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updateData = req.body;
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const [updated] = await Account.update(updateData, {
        where: { id: id }
      });

      if (updated) {
        const updatedAccount = await Account.findOne({ where: { id: id } });
        return res.status(200).json({ message: 'Account updated successfully', account: updatedAccount });
      }
      throw new Error('Account not found');
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  static deleteAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const account = await Account.findByPk(id);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      await account.destroy();
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const account = await Account.findOne({ where: { email } });
      if (!account) {
        return res.status(401).json({ message: 'Invalid Email' });
      }

      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
      }

      const token = jwt.sign({ id: account.id, email: account.email }, process.env.JWTSECRET as string, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
}
