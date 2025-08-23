import frappe

@frappe.whitelist()
def switch_theme(theme):
	if theme in ["Dark", "Light", "Automatic" , "Apricot", "Watermelon","Zwingli","Newara","Bluenxy","Classic"]:
		frappe.db.set_value("User", frappe.session.user, "desk_theme", theme)


