document.addEventListener('DOMContentLoaded', function () {

    console.log('TESTSTSTS');

    function updateSidebarLabelsAndTitle() {
        let updated = false;

        // Sidebar: Settings
        const settingsLink = document.querySelector('a[href="/app/erpnext-settings"]');
        if (settingsLink) {
            const label = settingsLink.querySelector('.sidebar-item-label') || settingsLink;
            if (label.textContent !== 'Tagrit Settings') {
                label.textContent = 'Tagrit Settings';
                updated = true;
            }
        } else {
            console.warn('Settings link not found');
        }

        // Sidebar: Integrations
        const integrationsLink = document.querySelector('a[href="/app/erpnext-integrations"]');
        if (integrationsLink) {
            const label = integrationsLink.querySelector('.sidebar-item-label') || integrationsLink;
            if (label.textContent !== 'Tagrit Integrations') {
                label.textContent = 'Tagrit Integrations';
                updated = true;
            }
        } else {
            console.warn('Integrations link not found');
        }

        // Workspace Title (re-applies each time it appears)
        const pageTitle = document.querySelector('h3.title-text');
        if (pageTitle) {
            const current = pageTitle.textContent.trim();
            if (current === 'ERPNext Settings') {
                pageTitle.textContent = 'Tagrit Settings';
                pageTitle.setAttribute('title', 'Tagrit Settings');
                updated = true;
            } else if (current === 'ERPNext Integrations') {
                pageTitle.textContent = 'Tagrit Integrations';
                pageTitle.setAttribute('title', 'Tagrit Integrations');
                updated = true;
            }
        }

        return updated;
    }

    // Keep observing — don’t disconnect
    const observer = new MutationObserver(() => {
        updateSidebarLabelsAndTitle();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Run initially
    updateSidebarLabelsAndTitle();

    // Also listen to route changes (needed for workspace navigation)
    if (frappe && frappe.router) {
        frappe.router.on('change', () => {
                updateSidebarLabelsAndTitle();
        });
    }

if (window.location.pathname.includes("/login")) {
    console.log('TEST ROUTE');

    const tryUpdateLogo = () => {
        const logoImg = document.querySelector('.app-logo'); // Adjust selector if needed

        if (logoImg) {
            logoImg.src = '/files/tagrit_logo.png';
            logoImg.style.maxWidth = "200px";
        } else {
            // Retry after a short delay if logo not found
            setTimeout(tryUpdateLogo, 300);
        }
    };

    tryUpdateLogo();
}

});
