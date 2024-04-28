import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; collectionId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }
    if (!params.collectionId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const collection = await prismadb.collection.updateMany({
      where: {
        id: params.collectionId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    // console.log('COLLECTION_PATCH :', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; collectionId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }
    if (!params.collectionId) {
      return new NextResponse("Collection ID is required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const collection = await prismadb.collection.deleteMany({
      where: {
        id: params.collectionId,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    //console.log('COLLECTION_DELETE :', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function GET(
  _req: Request,
  { params }: { params: { collectionId: string } },
) {
  try {
    if (!params.collectionId) {
      return new NextResponse("Collection ID is required", { status: 400 });
    }

    const collection = await prismadb.collection.findFirst({
      where: {
        id: params.collectionId,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    //console.log('[COLLECTION_GET] :', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
