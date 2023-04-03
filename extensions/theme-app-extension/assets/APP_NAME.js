(function () {
  const jsFile = !!document.querySelector('script[src*="APP_NAME.js"]');
  const cssFile = !!document.querySelector('link[href*="APP_NAME.css"]');
  console.log("APP_NAME's initing", jsFile, cssFile);
  if (!jsFile) {
    console.log("APP_NAME - JS loading");
    const $scriptEl = document.createElement("script");
    $scriptEl.type = "text/javascript";
    $scriptEl.src = "APP_NAME.netlify.js";
    $scriptEl.addEventListener("load", () => {
      console.log("APP_NAME - JS loaded");
    });
    $scriptEl.addEventListener("error", (e) => {
      console.log("APP_NAME - JS load failed", e);
    });
    document.body.appendChild($scriptEl);
  }
  if (!cssFile) {
    console.log("APP_NAME - CSS loading");
    const $linkEl = document.createElement("link");
    $linkEl.rel = "stylesheet";
    $linkEl.href = "APP_NAME.netlify.css";
    $linkEl.addEventListener("load", () => {
      console.log("APP_NAME - CSS loaded");
    });
    $linkEl.addEventListener("error", (e) => {
      console.log("APP_NAME - CSS load failed", e);
    });
    document.body.appendChild($linkEl);
  }
})();
