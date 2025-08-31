(() => {
  // ../tagritui/tagritui/public/js/theme_switcher.js
  frappe.provide("frappe.ui");
  frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
    constructor() {
      super();
    }
    fetch_themes() {
      return new Promise((resolve) => {
        this.themes = [
          {
            name: "light",
            label: "Frappe Light",
            info: "Light Theme"
          },
          {
            name: "dark",
            label: "Timeless Night",
            info: "Dark Theme"
          },
          {
            name: "automatic",
            label: "Automatic",
            info: "Uses system's theme to switch between light and dark mode"
          },
          {
            name: "apricot",
            label: "Apricot",
            info: "Apricot Theme"
          },
          {
            name: "watermelon",
            label: "Watermelon",
            info: "watermelon Theme"
          },
          {
            name: "zwingli",
            label: "Zwingli",
            info: "Zwingli Theme"
          },
          {
            name: "newara",
            label: "Newara",
            info: "Newara Theme"
          }
        ];
        resolve(this.themes);
      });
    }
  };
  if (frappe.ui && frappe.ui.ThemeSwitcher) {
    frappe.ui.theme_switcher = new frappe.ui.ThemeSwitcher();
  }

  // ../tagritui/tagritui/public/js/customization.js
  document.addEventListener("DOMContentLoaded", function() {
    console.log("TESTSTSTS");
    function updateSidebarLabelsAndTitle() {
      let updated = false;
      const settingsLink = document.querySelector('a[href="/app/erpnext-settings"]');
      if (settingsLink) {
        const label = settingsLink.querySelector(".sidebar-item-label") || settingsLink;
        if (label.textContent !== "Tagrit Settings") {
          label.textContent = "Tagrit Settings";
          updated = true;
        }
      } else {
        console.warn("Settings link not found");
      }
      const integrationsLink = document.querySelector('a[href="/app/erpnext-integrations"]');
      if (integrationsLink) {
        const label = integrationsLink.querySelector(".sidebar-item-label") || integrationsLink;
        if (label.textContent !== "Tagrit Integrations") {
          label.textContent = "Tagrit Integrations";
          updated = true;
        }
      } else {
        console.warn("Integrations link not found");
      }
      const pageTitle = document.querySelector("h3.title-text");
      if (pageTitle) {
        const current = pageTitle.textContent.trim();
        if (current === "ERPNext Settings") {
          pageTitle.textContent = "Tagrit Settings";
          pageTitle.setAttribute("title", "Tagrit Settings");
          updated = true;
        } else if (current === "ERPNext Integrations") {
          pageTitle.textContent = "Tagrit Integrations";
          pageTitle.setAttribute("title", "Tagrit Integrations");
          updated = true;
        }
      }
      return updated;
    }
    const observer = new MutationObserver(() => {
      updateSidebarLabelsAndTitle();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    updateSidebarLabelsAndTitle();
    if (frappe && frappe.router) {
      frappe.router.on("change", () => {
        updateSidebarLabelsAndTitle();
      });
    }
    if (window.location.pathname.includes("/login")) {
      console.log("TEST ROUTE");
      const tryUpdateLogo = () => {
        const logoImg = document.querySelector(".app-logo");
        if (logoImg) {
          logoImg.src = "/files/tagrit_logo.png";
          logoImg.style.maxWidth = "200px";
        } else {
          setTimeout(tryUpdateLogo, 300);
        }
      };
      tryUpdateLogo();
    }
  });
})();
//# sourceMappingURL=tagritui.bundle.4CP3Z6W6.js.map
