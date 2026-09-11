let carouselIsSliding = false;
const managedCarouselVideos = new Set();

let videoObserver = null;
let visibilityListenerInitialized = false;

export function setCarouselSliding(isSliding) {
  carouselIsSliding = Boolean(isSliding);
}

export function isCarouselSliding() {
  return carouselIsSliding;
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

function playVideo(video) {
  if (!video) {
    return;
  }

  if (
    document.hidden ||
    document.querySelector(".overlay") ||
    carouselIsSliding
  ) {
    pauseVideo(video);

    return;
  }

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
}

function isVideoVisible(video) {
  if (!video) {
    return false;
  }

  const rect = video.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  const visibleWidth =
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);

  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

  return (
    visibleWidth >= rect.width * 0.5 && visibleHeight >= rect.height * 0.35
  );
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
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.35 &&
          !document.hidden &&
          !document.querySelector(".overlay") &&
          !carouselIsSliding
        ) {
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      });
    },
    {
      threshold: [0, 0.35, 0.5, 0.75],
      rootMargin: "40px 0px",
    },
  );

  return videoObserver;
}

export function registerCarouselVideo(video) {
  if (!video) {
    return;
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

    const restartAndPlay = () => {
      if (
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
