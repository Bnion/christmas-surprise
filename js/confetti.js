window.fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since we don't have a library, let's just create simple DOM elements
        // Actually, let's use a simple canvas approach here if we don't want external deps.
        // But for a quick "pop", let's just create a burst of colored divs.

        createConfettiParticle();
        createConfettiParticle();
        createConfettiParticle();
    }, 50);

    function createConfettiParticle() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.top = Math.random() * window.innerHeight + 'px';
        el.style.zIndex = '9999';
        el.style.borderRadius = '50%';
        document.body.appendChild(el);

        // Animate
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        let x = parseFloat(el.style.left);
        let y = parseFloat(el.style.top);
        let velX = Math.cos(angle) * velocity;
        let velY = Math.sin(angle) * velocity;
        let gravity = 0.5;
        let opacity = 1;

        const anim = setInterval(() => {
            x += velX;
            y += velY;
            velY += gravity;
            opacity -= 0.02;

            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(anim);
                el.remove();
            }
        }, 20);
    }
};
