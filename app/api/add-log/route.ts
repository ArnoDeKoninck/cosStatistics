import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const res = await request.json()
    const {session, character, damage} = res
    const result = await prisma.logs.create({data:{session, name: character, damage}})
    return NextResponse.json({result})

}



