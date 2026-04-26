function normalizeVideoUrl(url) {
  if (!url) throw new Error("URL requerida");

  // =========================
  // 🎵 TIKTOK
  // =========================
  if (url.includes("tiktok.com")) {
    const match = url.match(/video\/(\d+)/);
    if (!match) throw new Error("URL de TikTok inválida");

    const videoId = match[1];

    return {
      embedUrl: `https://www.tiktok.com/embed/${videoId}?autoplay=1&mute=1`,
      platform: "tiktok",
    };
  }

  // =========================
  // ▶️ YOUTUBE
  // =========================
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (!match) throw new Error("URL de YouTube inválida");

    const videoId = match[1];

    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`,
      platform: "youtube",
    };
  }

  // =========================
  // 📸 INSTAGRAM (Reels / Posts)
  // =========================
  if (url.includes("instagram.com")) {
    const match = url.match(/(reel|p)\/([A-Za-z0-9_-]+)/);
    if (!match) throw new Error("URL de Instagram inválida");

    const shortcode = match[2];

    return {
      embedUrl: `https://www.instagram.com/p/${shortcode}/embed`,
      platform: "instagram",
    };
  }

  // =========================
  // 📘 FACEBOOK REELS
  // =========================
  if (url.includes("facebook.com")) {
    return {
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`,
      platform: "facebook",
    };
  }

  // =========================
  // ❌ NO SOPORTADO
  // =========================
  throw new Error("Plataforma no soportada");
}

module.exports = { normalizeVideoUrl };