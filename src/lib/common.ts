import {Response, Request, NextFunction} from "express"
import jsonwebtoken from "jsonwebtoken"
import config from "config"
import nodemailer from "nodemailer"

type handler = (req: Request, res: Response) => Promise<void>

export function asyncHandler(handler: handler) {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res).catch((err: Error) => {
            return res.json({error: err.message}).status(500)
        })
    }
}

export function decodeJWT(token: string):{_id: string} {
	const decoded = jsonwebtoken.verify(token, config.get("secret.jwtSecret"));

	// Assert the type of the decoded payload
    if (typeof decoded === "object" && decoded !== null && "_id" in decoded) {
        return decoded as { _id: string };
    }

    throw new Error("Invalid token payload");
}

export function encodeJWT(payload: {_id: string}) {
	return jsonwebtoken.sign(payload,config.get("secret.jwtSecret"))
}

export async function sendEmail({
	to, 
	subject , 
	text 
} : {
	to: string,
	subject: string,
	text: string
}): Promise<void> {
	// initialize nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
    	port: 587,
        auth: {
            user: config.get("email.emailUser"), // Your email
            pass: config.get("email.emailPass"), // Your email password
        },
    });

	// send email
    await transporter.sendMail({
        from: config.get("email.emailUser"),
        to,
        subject,
        text,
    });
}