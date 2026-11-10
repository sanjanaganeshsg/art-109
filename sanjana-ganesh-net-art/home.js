const signs = [...document.querySelectorAll(".sign")];
const signArea = document.querySelector(".sign-list");
const gap = 6;
let movers = [];
let lastFrame = performance.now();

for (let i = signs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [signs[i], signs[j]] = [signs[j], signs[i]];
}

function randomPoint(radius) {
    return {
        x: radius + Math.random() * (signArea.clientWidth - radius * 2),
        y: radius + Math.random() * (signArea.clientHeight - radius * 2)
    };
}

function positionSigns() {
    const radius = signs[0].offsetWidth / 2;
    const spacing = radius * 2 + gap;
    const points = [];

    signs.forEach((sign) => {
        let point;
        for (let attempt = 0; attempt < 200; attempt++) {
            const candidate = randomPoint(radius);
            if (points.every((placed) => Math.hypot(candidate.x - placed.x, candidate.y - placed.y) >= spacing)) {
                point = candidate;
                break;
            }
        }

        for (let y = radius; !point && y <= signArea.clientHeight - radius; y += spacing) {
            for (let x = radius; !point && x <= signArea.clientWidth - radius; x += spacing) {
                if (points.every((placed) => Math.hypot(x - placed.x, y - placed.y) >= spacing)) point = { x, y };
            }
        }

        points.push(point);
        sign.style.left = `${point.x}px`;
        sign.style.top = `${point.y}px`;
        signArea.append(sign);
    });

    movers = signs.map((sign, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 24 + Math.random() * 20;
        return { sign, x: points[index].x, y: points[index].y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
    });
}

function animate(time) {
    const radius = signs[0].offsetWidth / 2;
    const spacing = radius * 2 + gap;
    const seconds = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;

    movers.forEach((mover) => {
        mover.x += mover.vx * seconds;
        mover.y += mover.vy * seconds;
    });

    for (let i = 0; i < movers.length; i++) {
        for (let j = i + 1; j < movers.length; j++) {
            const a = movers[i];
            const b = movers[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.hypot(dx, dy);
            if (distance >= spacing) continue;

            const nx = dx / (distance || 1);
            const ny = dy / (distance || 1);
            const overlap = spacing - distance;
            a.x -= nx * overlap / 2;
            a.y -= ny * overlap / 2;
            b.x += nx * overlap / 2;
            b.y += ny * overlap / 2;

            const speed = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
            if (speed > 0) {
                a.vx -= speed * nx;
                a.vy -= speed * ny;
                b.vx += speed * nx;
                b.vy += speed * ny;
            }
        }
    }

    movers.forEach((mover) => {
        if (mover.x < radius || mover.x > signArea.clientWidth - radius) {
            mover.x = Math.max(radius, Math.min(signArea.clientWidth - radius, mover.x));
            mover.vx *= -1;
        }
        if (mover.y < radius || mover.y > signArea.clientHeight - radius) {
            mover.y = Math.max(radius, Math.min(signArea.clientHeight - radius, mover.y));
            mover.vy *= -1;
        }
        mover.sign.style.left = `${mover.x}px`;
        mover.sign.style.top = `${mover.y}px`;
    });

    requestAnimationFrame(animate);
}

positionSigns();
window.addEventListener("resize", positionSigns);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(animate);
