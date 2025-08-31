import frappe

@frappe.whitelist()
def switch_theme(theme):
	if theme in ["Dark", "Light", "Automatic" , "Apricot", "Watermelon","Zwingli","Newara","Bluenxy","Classic"]:
		frappe.db.set_value("User", frappe.session.user, "desk_theme", theme)


@frappe.whitelist(allow_guest=True)
def get_login_logo():
    return frappe.get_site_config().get("login_logo_url", "/files/tagrit_logo.png")

