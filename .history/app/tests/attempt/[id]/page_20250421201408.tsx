import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get token from cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const testId = params.id;

    // Check if the user has purchased this test
    const userTest = await prisma.order.findFirst({
      where: {
        userId: user.id,
        testId,
      },
    });

    if (!userTest) {
      return NextResponse.json(
        { success: false, error: "Test not purchased" },
        { status: 403 }
      );
    }

    // Get the test data
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                text: true,
                // Don't include isCorrect to prevent cheating
              },
            },
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json(
        { success: false, error: "Test not found" },
        { status: 404 }
      );
    }

    // Update test status to in progress if it's not already completed
    if (userTest.status !== "COMPLETED") {
      await prisma.userTest.update({
        where: { id: userTest.id },
        data: { status: "IN_PROGRESS" },
      });
    }

    return NextResponse.json({
      success: true,
      test,
    });
  } catch (error) {
    console.error("Error fetching test:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch test",
      },
      { status: 500 }
    );
  }
}
