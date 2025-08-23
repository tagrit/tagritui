# File: frappe-bench/apps/tagrit_custom/patches/2025-08-22_rename_erpnext_workspaces.py

import frappe

def execute():
    # Update the title of the "ERPNext Settings" Workspace
    frappe.db.set_value(
        "Workspace", 
        "ERPNext Settings",  # The current name of the Workspace document
        "title", 
        "Tagrit Settings"    # The new title you want to set
    )

    # Update the title of the "ERPNext Integrations" Workspace
    frappe.db.set_value(
        "Workspace", 
        "ERPNext Integrations", 
        "title", 
        "Tagrit Integrations"
    )

    frappe.db.commit() # This command saves the changes to the database
    frappe.msgprint("Workspaces renamed successfully.")