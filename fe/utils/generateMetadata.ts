// utils/generateMetadata.ts

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata(
  type: "tarot" | "saju",
  data: { question?: string }
) {
  // const question =
  //   data.question || `${type === "tarot" ? "타로" : "사주"} 결과`;

  const defaultTitle = "LuckYou - 당신의 운세와 미래를 밝혀드립니다";
  const defaultDescription =
    "LuckYou는 타로, 사주 등 다양한 운세 서비스를 제공하여 당신의 오늘의 운세와 미래에 대한 통찰력을 전달합니다.";

  return {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      images: [
        {
          url: `${baseUrl}/images/thumbnail.png`,
          width: 760,
          height: 760,
          alt: "logo",
        },
      ],
    },
  };
}
