// app/divination/[type]/result/[slug]/page.tsx

import { Suspense } from "react";
import { fetchResult } from "@/utils/fetchResult";
import HistoryContent from "@/components/History/HistoryContent";
import { generateMetadata as generateMetaUtil } from "@/utils/generateMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
  }/${type}/${slug}`;
  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      headers: { "x-auth-not-required": "true" },
    });
    if (!res.ok) throw new Error("Metadata fetch failed");
    const data = await res.json();
    const question = data.q || (type === "tarot" ? "타로 결과" : "사주 결과");

    return generateMetaUtil(type as "tarot" | "saju", data);
  } catch (error) {
    return {
      title: type === "tarot" ? "타로 결과" : "사주 결과",
      description: `LuckYou - 나의 운세는? ${
        type === "tarot" ? "타로" : "사주"
      }`,
    };
  }
}

// 서버 컴포넌트
export default async function DivinationResultPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  const data = await fetchResult(type as "tarot" | "saju", slug);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HistoryContent data={data} type={type as "tarot" | "saju"} />
    </Suspense>
  );
}
