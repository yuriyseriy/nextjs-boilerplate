import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRecoveryLink } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (user === null) {
    return NextResponse.json({ error: "User with this email not found" }, { status: 404 });
  }

  await sendRecoveryLink(email, "code");

  return NextResponse.json({ success: true });
}
