import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { address } = await req.json()

    // Check if address is provided
    if (!address) {
      return new Response(JSON.stringify({ error: 'Address is required' }), { status: 400 })
    }

    // Create a new wallet
    const newWallet = await prisma.wallet.create({
      data: {
        address,
      },
    })

    return new Response(JSON.stringify(newWallet), { status: 201 })
  } catch (error) {
    console.error('Error creating wallet:', error) // Log error for debugging
    return new Response(JSON.stringify({ error: 'Unable to add wallet address' }), { status: 500 })
  }
}
