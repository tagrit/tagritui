document.addEventListener('DOMContentLoaded', function () {

 if (window.location.pathname.includes("/login")) {
        console.log('Loading login logo from site config');

        const tryUpdateLogo = (logoSrc) => {
            const logoImg = document.querySelector('.app-logo');

            if (logoImg) {
                logoImg.src = logoSrc;
                logoImg.style.maxWidth = "200px";
            } else {
                setTimeout(() => tryUpdateLogo(logoSrc), 300);
            }
        };

        fetch('/api/method/tagritui.override.get_login_logo')
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    tryUpdateLogo(data.message);
                }
            })
            .catch(err => console.error('Failed to load login logo:', err));
    }

});
