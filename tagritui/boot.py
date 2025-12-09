import frappe
from frappe.desk.desktop import get_bootinfo as original_bootinfo

def get_bootinfo():
    boot = original_bootinfo()

    # Disable ERPNext onboarding completely
    if "onboarding_data" in boot:
        boot["onboarding_data"] = {}

    # Disable onboarding inside modules
    boot["hide_onboarding"] = 1
    boot["disable_onboarding"] = 1

    # Also from ERPNext
    boot["erpnext_onboarding"] = {}
    boot["module_onboarding"] = []

    return boot
