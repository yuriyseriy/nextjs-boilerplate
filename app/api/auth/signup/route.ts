import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { sendActivateLink } from "@/lib/mailer";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
  }

  const passwordHash = await hash(password, 10);

  const activationCode = randomUUID();

  const name = email.split("@")[0];

  console.log(name, email, password, passwordHash, activationCode);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      activationCode,
    },
  });

  await sendActivateLink(email, activationCode);

  return NextResponse.json({ userId: result.id });
}
