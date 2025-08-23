import frappe

def get_theme_css():
    """
    Returns the path to the theme-specific CSS file
    based on the user's selected website theme.
    """
    current_theme = frappe.get_website_theme()

    if current_theme == "zwingli":
        return "/assets/tagritui/css/zwingli_web.bundle.css"
    else:
        # Return an empty string if no specific theme CSS is needed
        return ""