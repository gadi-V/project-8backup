import { NextRequest, NextResponse } from "next/server";
import { getPackagePedagogicalBrief, uploadPreLessonAsset } from "../../../../../lib/package-chat";
import { PreLessonAssetType } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const packageId = resolvedParams.id;

    const brief = await getPackagePedagogicalBrief(packageId);
    if (!brief) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({
      packageId,
      assets: brief.preLessonAssets,
      chat: brief.chat,
      lessons: brief.lessons,
    });
  } catch (error) {
    console.error("Failed to fetch pedagogical brief:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const packageId = resolvedParams.id;
    const body = await request.json();

    const { lessonId, assetType, assetUrl, textContent, uploadedById } = body;

    if (!uploadedById || !assetType) {
      return NextResponse.json(
        { error: "Missing required fields: uploadedById and assetType are mandatory" },
        { status: 400 }
      );
    }

    const validTypes = Object.values(PreLessonAssetType);
    if (!validTypes.includes(assetType)) {
      return NextResponse.json(
        { error: `Invalid assetType. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const asset = await uploadPreLessonAsset({
      packageId,
      lessonId,
      assetType,
      assetUrl,
      textContent,
      uploadedById,
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("Failed to upload pre-lesson asset:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
