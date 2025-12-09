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
  frappe.provide("frappe.ui");
  var updateTimeout = null;
  function updateSidebarLabelsAndTitle() {
    let updated = false;
    const settingsLink = document.querySelector('a[href="/app/erpnext-settings"]');
    if (settingsLink) {
      const label = settingsLink.querySelector(".sidebar-item-label") || settingsLink;
      if (label.textContent !== "Tagrit Settings") {
        label.textContent = "Tagrit Settings";
        updated = true;
      }
    }
    const integrationsLink = document.querySelector('a[href="/app/erpnext-integrations"]');
    if (integrationsLink) {
      const label = integrationsLink.querySelector(".sidebar-item-label") || integrationsLink;
      if (label.textContent !== "Tagrit Integrations") {
        label.textContent = "Tagrit Integrations";
        updated = true;
      }
    }
    const crmLink = document.querySelector('a[href="/app/frappe-crm"]');
    if (crmLink) {
      const label = crmLink.querySelector(".sidebar-item-label") || crmLink;
      if (label.textContent !== "Tagrit CRM") {
        label.textContent = "Tagrit CRM";
        updated = true;
      }
    }
    const titleSelectors = [
      "h3.title-text",
      ".page-title h3",
      ".page-title .title-text"
    ];
    for (const selector of titleSelectors) {
      const pageTitle = document.querySelector(selector);
      if (pageTitle) {
        const current = pageTitle.textContent.trim();
        if (current === "ERPNext Settings" && current !== "Tagrit Settings") {
          pageTitle.textContent = "Tagrit Settings";
          pageTitle.setAttribute("title", "Tagrit Settings");
          updated = true;
          break;
        } else if (current === "ERPNext Integrations" && current !== "Tagrit Integrations") {
          pageTitle.textContent = "Tagrit Integrations";
          pageTitle.setAttribute("title", "Tagrit Integrations");
          updated = true;
          break;
        } else if (current === "Frappe CRM" && current !== "Tagrit CRM") {
          pageTitle.textContent = "Tagrit CRM";
          pageTitle.setAttribute("title", "Tagrit CRM");
          updated = true;
          break;
        }
      }
    }
    const onboardingElements = document.querySelectorAll(".onboarding-modal, .modal-onboarding, [data-onboarding]");
    if (onboardingElements.length > 0) {
      onboardingElements.forEach((el) => el.remove());
    }
    return updated;
  }
  function throttledUpdate() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(updateSidebarLabelsAndTitle, 50);
  }
  document.addEventListener("DOMContentLoaded", function() {
    updateSidebarLabelsAndTitle();
    const observer = new MutationObserver((mutations) => {
      const isRelevant = mutations.some((mutation) => {
        if (mutation.type === "childList") {
          return Array.from(mutation.addedNodes).some((node) => {
            var _a, _b;
            if (node.nodeType === 1) {
              return ((_a = node.matches) == null ? void 0 : _a.call(node, "h3, .title-text, .sidebar-item-label, [data-onboarding]")) || ((_b = node.querySelector) == null ? void 0 : _b.call(node, "h3, .title-text, .sidebar-item-label, [data-onboarding]"));
            }
            return false;
          });
        }
        return false;
      });
      if (isRelevant) {
        throttledUpdate();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false,
      attributes: false
    });
    if (frappe && frappe.router) {
      frappe.router.on("change", () => {
        setTimeout(updateSidebarLabelsAndTitle, 50);
        setTimeout(updateSidebarLabelsAndTitle, 150);
        setTimeout(updateSidebarLabelsAndTitle, 300);
        setTimeout(() => {
          const onboardingElements = document.querySelectorAll(".onboarding-modal, .modal-onboarding, [data-onboarding]");
          onboardingElements.forEach((el) => el.remove());
        }, 100);
      });
    }
  });
  if (typeof frappe !== "undefined") {
    frappe.ready(function() {
      updateSidebarLabelsAndTitle();
      setTimeout(updateSidebarLabelsAndTitle, 200);
    });
  }
  window.addEventListener("load", () => {
    setTimeout(updateSidebarLabelsAndTitle, 300);
  });
})();
//# sourceMappingURL=tagritui.bundle.IF5YSILV.js.map
