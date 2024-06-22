import { Request, Response } from 'express';
import admin from '../firebase-admin';
import { sendEmail } from '../service/emailService';

export class FirebaseAccountController {
    static createAccount = async (req: Request, res: Response) =>{
        const { email, password } = req.body;

        try {
            console.log("database", req.body);
            const userRecord = await admin.auth().createUser({
                email,
                password,
            });
            await sendEmail(email, 'Account Created', 'You have successfully Created Account.');
            res.status(201).send({ uid: userRecord.uid });
        } catch (error) {
            res.status(400).send({ error: (error as Error).message });
        }
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            const customToken = await admin.auth().createCustomToken(userRecord.uid);
            res.send({ customToken });
        } catch (error) {
            res.status(400).send({ error: (error as Error).message });
        }
    }
    static getAccount = async (req: Request, res: Response) => {
        res.send({ user: (req as any).user });
    }
}