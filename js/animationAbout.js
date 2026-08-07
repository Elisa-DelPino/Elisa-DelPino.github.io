let aboutInitialized = false;

export function initAboutAnimation() {
  if (aboutInitialized) return;

  const about = document.querySelector(".section__about");

  if (!about) return;

  aboutInitialized = true;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;

      about.classList.add("is-visible");

      obs.unobserve(about);
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  observer.observe(about);
}
