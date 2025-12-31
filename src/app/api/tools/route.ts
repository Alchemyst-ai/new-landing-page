import ContextSpace from "@/app/models/ContextSpace";
import SharedItem from "@/app/models/SharedItem";
import { dbConnect } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") ?? "all";
  const search = searchParams.get("search");

  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const filter: Record<string, any> = {};

  switch (type) {
    case "featured": {
      // No additional filter for "featured" in this code
      break;
    }
    case "recommended": {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filter.createdAt = { $gte: sevenDaysAgo };
      break;
    }
    case "all": {
      // No additional filter for "all"
      break;
    }
    default: {
      filter.categories = { $elemMatch: { $regex: `^${type}$`, $options: "i" } };
      break;
    }
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  try {
    // const data = await Tool.find(filter)
    //   .sort({ createdAt: -1 })
    //   .skip(offset)
    //   .limit(limit)
    //   .lean();
    const data = await ContextSpace
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const body = await request.json();

  const magicKey = `mk-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  try {
    const item = await SharedItem.create({
      ...body,
      magic_key: magicKey,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
