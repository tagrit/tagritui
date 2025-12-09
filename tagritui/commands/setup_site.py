import frappe

def run():
    print("Disabling ERPNext Onboarding...")

    # Mark Module Onboarding as complete
    for d in frappe.get_all("Module Onboarding"):
        frappe.db.set_value("Module Onboarding", d.name, "is_complete", 1)

    # Mark Onboarding Steps as complete
    for d in frappe.get_all("Onboarding Step"):
        frappe.db.set_value("Onboarding Step", d.name, "is_complete", 1)

    print("Disabling Update Notifications...")
    frappe.db.set_single_value("System Settings", "disable_system_update_notification", 1)
    frappe.db.set_single_value("System Settings", "disable_update_notification_email", 1)

    print("Setting default app to ERPNext...")
    frappe.db.set_single_value("System Settings", "default_app", "erpnext")

    # -------------------------------
    # Set default logo (if none exists)
    # -------------------------------
    s = frappe.get_single("System Settings")
    if not s.get("app_logo"):
        frappe.db.set_single_value("System Settings", "app_logo", "/assets/tagritui/images/tagrit_logo.png")
        print("Default app logo set ✅")
    else:
        print("Client logo already exists, skipping default logo")

    frappe.db.commit()
    
    print("\n" + "="*50)
    print("✅ Setup Complete!")
    print("="*50)
    print("\nNote: Workspace rebranding (Frappe CRM → Tagrit CRM)")
    print("is handled safely via CSS/JS for maximum compatibility.")
    print("\nNext steps:")
    print("  1. bench --site yoursite.com clear-cache")
    print("  2. bench restart")
    print("="*50)