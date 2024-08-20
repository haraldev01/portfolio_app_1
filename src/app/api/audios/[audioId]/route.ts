import getAudioPost from "@/services/getAudioPost";
import { AudioPost } from "@/types/post";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { audioid: string } },
): Promise<NextResponse<AudioPost>> {
  const audioId = params.audioid;
  const post = await getAudioPost({ audioId: audioId });
  return NextResponse.json(post);
}
