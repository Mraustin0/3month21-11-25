const scrollButtons = document.querySelectorAll("[data-scroll-to]");
const letterModal = document.querySelector(".letter-modal");
const openLetterBtn = document.getElementById("open-letter");
const closeTargets = document.querySelectorAll("[data-close]");

scrollButtons.forEach((button) => {
  const targetSelector = button.getAttribute("data-scroll-to");
  button.addEventListener("click", () => {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

const openLetter = () => {
  letterModal?.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeLetter = () => {
  letterModal?.classList.remove("active");
  document.body.style.overflow = "";
};

openLetterBtn?.addEventListener("click", () => {
  openLetter();
});

closeTargets.forEach((target) => {
  target.addEventListener("click", () => {
    closeLetter();
  });
});

letterModal?.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal?.classList.contains("active")) {
    closeLetter();
  }
});

// Video playlist controls (hover next/prev)
const mediaCard = document.querySelector(".media-card");
const videoEl = mediaCard?.querySelector("video.media");
const prevBtn = mediaCard?.querySelector(".media-btn.prev");
const nextBtn = mediaCard?.querySelector(".media-btn.next");

const parsePlaylist = (el) => {
  const raw = el?.dataset?.playlist || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const playlist = parsePlaylist(mediaCard);
let currentIndex = 0;

const getCurrentSrc = () => {
  if (!videoEl) return "";
  const current = videoEl.currentSrc || videoEl.src || "";
  return current;
};

const findClosestIndex = () => {
  const current = getCurrentSrc();
  const found = playlist.findIndex((p) => current.includes(p));
  return found >= 0 ? found : 0;
};

const setVideo = (index) => {
  if (!videoEl || playlist.length === 0) return;
  currentIndex = (index + playlist.length) % playlist.length;
  const nextSrc = playlist[currentIndex];
  // Swap main source (prefer first <source> if present)
  const firstSource = videoEl.querySelector("source[type='video/mp4']") || videoEl.querySelector("source");
  if (firstSource) {
    firstSource.setAttribute("src", nextSrc);
  } else {
    videoEl.setAttribute("src", nextSrc);
  }
  // Optional: update poster if a matching -poster file exists (same base + -poster.jpg)
  try {
    const base = nextSrc.replace(/\.(mp4|webm)$/i, "");
    videoEl.setAttribute("poster", `${base}-poster.jpg`);
  } catch {}
  videoEl.pause();
  videoEl.load();
  // Autoplay the next one if user already interacted
  const playPromise = videoEl.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
};

if (mediaCard && videoEl && playlist.length > 0) {
  currentIndex = findClosestIndex();
  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    setVideo(currentIndex - 1);
  });
  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    setVideo(currentIndex + 1);
  });
}

