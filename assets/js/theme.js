(function () {
  "use strict";

  var storageKey = "site-theme";
  var root = document.documentElement;
  var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      var storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : null;
    }
    catch (_error) {
      return null;
    }
  }

  function preferredTheme() {
    return getStoredTheme() || (mediaQuery.matches ? "dark" : "light");
  }

  function updateToggle(theme) {
    var toggle = document.querySelector("[data-theme-toggle]");

    if (!toggle) {
      return;
    }

    var darkModeActive = theme === "dark";
    var label = darkModeActive ? "Hell" : "Dunkel";
    var icon = darkModeActive ? "☀" : "☾";

    toggle.setAttribute("aria-pressed", String(darkModeActive));
    toggle.setAttribute(
      "aria-label",
      darkModeActive
        ? "Helles Farbschema aktivieren"
        : "Dunkles Farbschema aktivieren"
    );
    toggle.querySelector("[data-theme-icon]").textContent = icon;
    toggle.querySelector("[data-theme-label]").textContent = label;
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    updateToggle(theme);

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, theme);
      }
      catch (_error) {
        // The selected theme still applies for the current page.
      }
    }
  }

  applyTheme(preferredTheme(), false);

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");

    updateToggle(root.dataset.theme);

    if (toggle) {
      toggle.addEventListener("click", function () {
        applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
      });
    }
  });

  mediaQuery.addEventListener("change", function (event) {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light", false);
    }
  });
})();
