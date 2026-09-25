const ANALYTICS_EXCLUSION_KEY = "elisaDevExcludeAnalytics";

const params = new URLSearchParams(window.location.search);

if (params.get("owner-analytics") === "off") {
  localStorage.setItem(ANALYTICS_EXCLUSION_KEY, "1");

  params.delete("owner-analytics");

  const cleanUrl =
    window.location.pathname +
    (params.toString() ? `?${params.toString()}` : "") +
    window.location.hash;

  window.history.replaceState({}, "", cleanUrl);
}

if (params.get("owner-analytics") === "on") {
  localStorage.removeItem(ANALYTICS_EXCLUSION_KEY);

  params.delete("owner-analytics");

  const cleanUrl =
    window.location.pathname +
    (params.toString() ? `?${params.toString()}` : "") +
    window.location.hash;

  window.history.replaceState({}, "", cleanUrl);
}

const analyticsExcluded = localStorage.getItem(ANALYTICS_EXCLUSION_KEY) === "1";

if (!analyticsExcluded) {
  const cloudflareScript = document.createElement("script");

  cloudflareScript.type = "module";
  cloudflareScript.src = "https://static.cloudflareinsights.com/beacon.min.js";

  cloudflareScript.setAttribute(
    "data-cf-beacon",
    '{"token":"e0eb8e057d7943f2a6e3bc90651b961d"}',
  );

  document.body.appendChild(cloudflareScript);
}
