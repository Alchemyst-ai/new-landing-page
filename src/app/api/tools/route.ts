import ContextSpace from "@/app/models/ContextSpace";
import SharedItem from "@/app/models/SharedItem";
import { dbConnect } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/User";
import slugify from "slugify";



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
      break;
    }
    case "recommended": {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filter.createdAt = { $gte: sevenDaysAgo };
      break;
    }
    case "all": {
      break;
    }
    default: {
      // filter.categories = { $elemMatch: { $regex: `^${type}$`, $options: "i" } };
      const slugifiedType = slugify(type, { lower: true, strict: true });
      filter.$expr = {
        $gt: [
          {
            $size: {
              $filter: {
                input: "$categories",
                as: "cat",
                cond: {
                  $regexMatch: {
                    input: {
                      $toLower: {
                        $replaceAll: {
                          input: { $trim: { input: "$$cat" } },
                          find: " ",
                          replacement: "-"
                        }
                      }
                    },
                    regex: `^${slugifiedType}$`,
                    options: "i"
                  }
                }
              }
            }
          },
          0
        ]
      };
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
    const data = await ContextSpace
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)

    const userIds = [...new Set(data.map(item => item.user_id))];

    const users = await User.find({ _id: { $in: userIds } }).select('_id fullName');

    // console.log(users);

    const userMap = users.reduce((acc, user) => {
      const userObj = user.toObject({ virtuals: true });
      acc[user._id.toString()] = userObj.fullName;
      return acc;
    }, {});

    // console.log(userMap);

    const enrichedData = data.map(item => ({
      ...item.toObject(),
      fullName: userMap[item.user_id.toString()] || null
    }));

    return NextResponse.json(enrichedData);

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
