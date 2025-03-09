// import type { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@/lib/prisma'; // ✅ Import singleton Prisma instance

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { walletAddress } = req.body;

//     if (!walletAddress) {
//       return res.status(400).json({ error: 'Wallet address is required' });
//     }

//     try {
//       const wallet = await prisma.wallet.create({
//         data: { address: walletAddress },
//       });

//       return res.status(200).json(wallet);
//     } catch (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//   }

//   return res.status(405).json({ error: 'Method Not Allowed' });
// }
