import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    
    res.setHeader(
    "Set-Cookie",
    cookie.serialize("fingerprint", req.body.fingerprint, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
    
  } 
}