let carouselIsSliding = false;
let carouselVideoPlaybackEnabled = false;
const managedCarouselVideos = new Set();

let videoObserver = null;
let visibilityListenerInitialized = false;

export function setCarouselSliding(isSliding) {
  carouselIsSliding = Boolean(isSliding);
}

export function isCarouselSliding() {
  return carouselIsSliding;
}

export function setCarouselVideoPlaybackEnabled(isEnabled) {
  carouselVideoPlaybackEnabled = Boolean(isEnabled);

  if (!carouselVideoPlaybackEnabled) {
    pauseAllCarouselVideos();

    return;
  }

  requestAnimationFrame(() => {
    updateVisibleCarouselVideos();
  });
}

/* =========================================================
   GESTION OPTIMISÉE DES VIDÉOS
========================================================= */

function pauseVideo(video) {
  if (!video) {
    return;
  }

  try {
    video.pause();
  } catch (error) {
    console.warn("Impossible de mettre la vidéo en pause :", error);
  }
}

function ensureVideoSource(video) {
  if (!video || video.getAttribute("src")) {
    return;
  }

  const source = video.dataset.src;

  if (!source) {
    return;
  }

  video.src = source;

  try {
    video.load();
  } catch {}
}

function playVideo(video) {
  if (!video) {
    return;
  }

  if (
    !carouselVideoPlaybackEnabled ||
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding ||
    !isVideoVisible(video)
  ) {
    pauseVideo(video);

    return;
  }

  ensureVideoSource(video);

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

function isVideoVisible(video) {
  if (!video || !video.isConnected) {
    return false;
  }

  const styles = window.getComputedStyle(video);

  if (
    styles.display === "none" ||
    styles.visibility === "hidden" ||
    Number(styles.opacity) === 0
  ) {
    return false;
  }

  const rect = video.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  const visibleWidth = Math.max(
    0,
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
  );

  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
  );

  const visibleArea = visibleWidth * visibleHeight;
  const totalArea = rect.width * rect.height;

  return totalArea > 0 && visibleArea / totalArea >= 0.6;
}

function createVideoObserver() {
  if (videoObserver) {
    return videoObserver;
  }

  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (
          carouselVideoPlaybackEnabled &&
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.6 &&
          !document.hidden &&
          !document.querySelector(".overlay") &&
          !carouselIsSliding &&
          isVideoVisible(video)
        ) {
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      });
    },
    {
      threshold: [0, 0.25, 0.6, 0.8, 1],
      rootMargin: "0px",
    },
  );

  return videoObserver;
}

export function registerCarouselVideo(video, source = "") {
  if (!video) {
    return;
  }

  if (source) {
    video.dataset.src = source;
  }

  managedCarouselVideos.add(video);

  createVideoObserver().observe(video);
}

function unregisterCarouselVideo(video) {
  if (!video) {
    return;
  }

  pauseVideo(video);

  if (videoObserver) {
    videoObserver.unobserve(video);
  }

  managedCarouselVideos.delete(video);
}

export function pauseAllCarouselVideos() {
  managedCarouselVideos.forEach((video) => {
    pauseVideo(video);
  });
}

export function updateVisibleCarouselVideos() {
  if (
    !carouselVideoPlaybackEnabled ||
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseAllCarouselVideos();

    return;
  }

  managedCarouselVideos.forEach((video) => {
    if (isVideoVisible(video)) {
      playVideo(video);
    } else {
      pauseVideo(video);
    }
  });
}

export function restartVisibleCarouselVideosFromStart() {
  if (
    !carouselVideoPlaybackEnabled ||
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseAllCarouselVideos();

    return;
  }

  managedCarouselVideos.forEach((video) => {
    pauseVideo(video);

    if (!isVideoVisible(video)) {
      return;
    }

    ensureVideoSource(video);

    const restartAndPlay = () => {
      if (
        !carouselVideoPlaybackEnabled ||
        document.hidden ||
        document.querySelector(".overlay") ||
        carouselIsSliding ||
        !isVideoVisible(video)
      ) {
        return;
      }

      try {
        video.currentTime = 0;
      } catch {}

      playVideo(video);
    };

    if (video.readyState >= 1) {
      restartAndPlay();
    } else {
      video.addEventListener("loadedmetadata", restartAndPlay, {
        once: true,
      });
    }
  });
}

export function cleanupVideosInside(element) {
  if (!element) {
    return;
  }

  const videos = element.querySelectorAll(".demo-carousel__video");

  videos.forEach((video) => {
    unregisterCarouselVideo(video);

    video.removeAttribute("src");
    delete video.dataset.src;

    try {
      video.load();
    } catch {}
  });
}

export function initializeVideoVisibilityHandling() {
  if (visibilityListenerInitialized) {
    return;
  }

  visibilityListenerInitialized = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAllCarouselVideos();
    } else {
      requestAnimationFrame(() => {
        updateVisibleCarouselVideos();
      });
    }
  });
}
