import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from 'nodemailer';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
      var cookies = cookie.parse(req.headers.cookie || '');
      const {emailReceiver, transactionReceipt, fingerprint, links, tokenId, youSpent} = req.body;
      let cookieToken = cookies.hasOwnProperty('fingerprint') ? cookies.fingerprint : '';
      let decodedCookie: string | JwtPayload;
      try{
            decodedCookie = jwt.verify(cookieToken, process.env.NEXT_PUBLIC_JWT_SECRET);
            //decodedToken = jwt.verify(fingerprintEncoded, process.env.NEXT_PUBLIC_JWT_SECRET);
      } catch(err){
        // decodedCookie remains undefined
      }
      if (decodedCookie && decodedCookie.hasOwnProperty('fingerprint') && fingerprint){
                if ((decodedCookie as {fingerprint: string}).fingerprint === fingerprint){
                    const emailText = createEmailText({
                    plainText1: `Dear ${emailReceiver} aka NFT Minter,\n`,
                    plainText2: `${youSpent}.\n`,
                    plainText3: 'Here is a summary of the most important information about your NFT.\n',
                    plainText4: 'Some Links:',
                    plainText5: ''.padStart(11, '*'),
                    ...links,
                    plainText6: '\nTransaction Receipt (Selected):',
                    plainText7: ''.padStart(31, '*'),
                    ...transactionReceipt,
                    plainText8: '\nWith kind regards\n\nYour NFTetris Team'
                });
                const options = {
                from: {
                    name: 'NFTetris',
                    address: process.env.NEXT_PUBLIC_EMAIL_USER
                },
                to: emailReceiver,
                subject: `NFTetris: Transaction Details of your NFT (Token Id: ${tokenId})`,
                text: emailText
                }
                const p = processMail(options);
                p.then(_ => {
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("fingerprint", "", {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        expires: new Date(0),
                        sameSite: "strict",
                        path: "/",
                        })
                    );
                    res.status(200).json({ status: `SUCCESS`, message: `E-Mail succesfully sent to $decoded` });
            }).catch(_ => {
                res.status(500).json({ status: `ERROR`, message: `Server Error: Could not send email to $decoded` });
            })
        } else {
            res.status(401).json({ status: 'ERROR', message: 'Error 401: Unauthorized' });
        }
      } else {
        res.status(401).json({ status: 'ERROR', message: 'Error 401: Unauthorized' });
      }
      
  } else {
        res.status(401).json({ status: 'ERROR', message: 'Error 401: Unauthorized' });
  }
}

function processMail(options: Record<string, any>){
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        },
    });

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, function(err, info){
            if (info){
                resolve(info);
            }
            const errObj = err || 'Error';
            reject(errObj);
        })
    })
}

function createEmailText(value: Record<string, string>){
    const keys = Object.keys(value);
    const values = Object.values(value);
    const keysMax = Math.max(...keys.map(x => x.length));
    const valuesMax = Math.max(...values.map(x => x.length));
    const text = keys.map((key, index) => {
        if (key.startsWith('plainText')){
            return values[index];
        } else {
            return `${key.padEnd(keysMax)} ${values[index].padStart(valuesMax)}`;
        }
    }).join(`\n`);
    return text;
}