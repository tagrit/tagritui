frappe.provide("frappe.ui");

// ============================================
// OPTIMIZED TITLE AND SIDEBAR UPDATER
// ============================================

let updateTimeout = null;

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
    }

    // Sidebar: Integrations
    const integrationsLink = document.querySelector('a[href="/app/erpnext-integrations"]');
    if (integrationsLink) {
        const label = integrationsLink.querySelector('.sidebar-item-label') || integrationsLink;
        if (label.textContent !== 'Tagrit Integrations') {
            label.textContent = 'Tagrit Integrations';
            updated = true;
        }
    }


     // Sidebar: Integrations
    const crmLink = document.querySelector('a[href="/app/frappe-crm"]');
    if (crmLink) {
        const label = crmLink.querySelector('.sidebar-item-label') || crmLink;
        if (label.textContent !== 'Tagrit CRM') {
            label.textContent = 'Tagrit CRM';
            updated = true;
        }
    }

    // Workspace Title - try multiple selectors
    const titleSelectors = [
        'h3.title-text',
        '.page-title h3',
        '.page-title .title-text'
    ];

    for (const selector of titleSelectors) {
        const pageTitle = document.querySelector(selector);
        if (pageTitle) {
            const current = pageTitle.textContent.trim();
            
            if (current === 'ERPNext Settings' && current !== 'Tagrit Settings') {
                pageTitle.textContent = 'Tagrit Settings';
                pageTitle.setAttribute('title', 'Tagrit Settings');
                updated = true;
                break;
            } else if (current === 'ERPNext Integrations' && current !== 'Tagrit Integrations') {
                pageTitle.textContent = 'Tagrit Integrations';
                pageTitle.setAttribute('title', 'Tagrit Integrations');
                updated = true;
                break;
            } else if (current === 'Frappe CRM' && current !== 'Tagrit CRM') {
                pageTitle.textContent = 'Tagrit CRM';
                pageTitle.setAttribute('title', 'Tagrit CRM');
                updated = true;
                break;
            }
        }
    }

    // Remove onboarding elements
    const onboardingElements = document.querySelectorAll('.onboarding-modal, .modal-onboarding, [data-onboarding]');
    if (onboardingElements.length > 0) {
        onboardingElements.forEach(el => el.remove());
    }

    return updated;
}

// Throttled version to prevent excessive updates
function throttledUpdate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(updateSidebarLabelsAndTitle, 50);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    
    // Run initially
    updateSidebarLabelsAndTitle();

    // Smart MutationObserver - only trigger on relevant changes
    const observer = new MutationObserver((mutations) => {
        // Check if mutation affects title or sidebar
        const isRelevant = mutations.some(mutation => {
            if (mutation.type === 'childList') {
                // Check if added nodes contain title or sidebar elements
                return Array.from(mutation.addedNodes).some(node => {
                    if (node.nodeType === 1) { // Element node
                        return node.matches?.('h3, .title-text, .sidebar-item-label, [data-onboarding]') ||
                               node.querySelector?.('h3, .title-text, .sidebar-item-label, [data-onboarding]');
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

    // Listen to Frappe router changes
    if (frappe && frappe.router) {
        frappe.router.on('change', () => {
            // Run multiple times to catch async title updates
            setTimeout(updateSidebarLabelsAndTitle, 50);
            setTimeout(updateSidebarLabelsAndTitle, 150);
            setTimeout(updateSidebarLabelsAndTitle, 300);
            
            // Remove onboarding on route change
            setTimeout(() => {
                const onboardingElements = document.querySelectorAll('.onboarding-modal, .modal-onboarding, [data-onboarding]');
                onboardingElements.forEach(el => el.remove());
            }, 100);
        });
    }
});

// Also hook into frappe.ready for additional coverage
if (typeof frappe !== 'undefined') {
    frappe.ready(function() {
        updateSidebarLabelsAndTitle();
        
        // Additional update after a short delay
        setTimeout(updateSidebarLabelsAndTitle, 200);
    });
}

// Final fallback on window load
window.addEventListener('load', () => {
    setTimeout(updateSidebarLabelsAndTitle, 300);
});