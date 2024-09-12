import { getURL } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

const BASE_URL = getURL();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const title = searchParams.get("title");
    const author = searchParams.get("author");
    const author_url = searchParams.get("author_url");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#021528",
            border: "4px solid #6ca9ff",
          }}>
          <div tw="flex flex-col w-full py-12 px-4 p-8">
            <h1
              tw="font-bold"
              style={{
                marginBottom: "100",
                fontSize: "80",
                color: "#6ca9ff",
              }}>
              {title}
            </h1>
            <div
              tw="flex flex-row item-center w-full gap-3"
              style={{
                alignItems: "center",
                gap: 20,
              }}>
              {/* eslint-disable-next-line */}
              <img
                src={author_url!}
                width={100}
                height={100}
                tw="rounded-full border-4 border-green-500"
              />
              <div tw="flex flex-col">
                <h1 tw="m-0 text-white">{author}</h1>
                <p tw="m-0 text-white text-2xl mt-3">{BASE_URL}</p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
