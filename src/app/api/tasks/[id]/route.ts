import { updateTaskStatus } from "@/server/db/smallActions";
import { NextRequest } from "next/server";

const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await req.json();
    const ret = await updateTaskStatus(params.id, body.status);

    return Response.json(ret);
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message });
    }
  }
};

export { PATCH };
