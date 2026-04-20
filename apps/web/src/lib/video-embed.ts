/** تحويل روابط يوتيوب الشائعة إلى رابط تضمين؛ روابط mp4/webm تُعرض عبر عنصر video */
export function youtubeEmbedSrc(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function isDirectVideoUrl(url: string): boolean {
  const t = url.trim().toLowerCase();
  return t.endsWith(".mp4") || t.endsWith(".webm") || t.includes("/video/");
}
