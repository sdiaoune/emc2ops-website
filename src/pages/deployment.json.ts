export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify({
      commit: process.env.VERCEL_GIT_COMMIT_SHA || "local",
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  );
}
