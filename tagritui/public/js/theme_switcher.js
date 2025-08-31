frappe.provide("frappe.ui");

frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
    constructor() {
        super()
    }

    fetch_themes() {
		return new Promise((resolve) => {
			this.themes = [
				{
					name: "light",
					label:("Frappe Light"),
					info:("Light Theme"),
				},
				{
					name: "dark",
					label:"Timeless Night",
					info:"Dark Theme",
				},
				{
					name: "automatic",
					label:"Automatic",
					info:"Uses system's theme to switch between light and dark mode",
				},
                {
                    name:"apricot",
                    label: "Apricot",
                    info: "Apricot Theme"
                },
                {
                    name:"watermelon",
                    label: "Watermelon",
                    info: "watermelon Theme"
                },
                {
                    name:"zwingli",
                    label: "Zwingli",
                    info: "Zwingli Theme"
                },
                {
                    name:"newara",
                    label: "Newara",
                    info: "Newara Theme"
                }
			];

			resolve(this.themes);
		});
	}

}

// Force re-initialization after override
if (frappe.ui && frappe.ui.ThemeSwitcher) {
  frappe.ui.theme_switcher = new frappe.ui.ThemeSwitcher();
}
