const field = document.querySelector(".pearl-field");
const card = document.querySelector(".sign-order");
const objects = [...document.querySelectorAll(".floating-object")];
const text = [...card.querySelectorAll("h1, h2, p")];
let movers = [];
let lastFrame = performance.now();

function isOverText(mover, x, y) {
    return mover.textAreas.some((area) =>
        x > area.left && x < area.right && y > area.top && y < area.bottom
    );
}

function placeObjects() {
    const fieldBox = field.getBoundingClientRect();

    movers = objects.map((object) => {
        const radius = Math.max(object.offsetWidth, object.offsetHeight) / 2;
        const textAreas = text.map((element) => {
            const box = element.getBoundingClientRect();
            return {
                left: box.left - fieldBox.left - radius - 8,
                right: box.right - fieldBox.left + radius + 8,
                top: box.top - fieldBox.top - radius - 8,
                bottom: box.bottom - fieldBox.top + radius + 8
            };
        });
        const mover = { object, radius, textAreas };
        let x;
        let y;

        do {
            x = radius + Math.random() * (fieldBox.width - radius * 2);
            y = radius + Math.random() * (fieldBox.height - radius * 2);
        } while (isOverText(mover, x, y));

        const angle = Math.random() * Math.PI * 2;
        const speed = 25 + Math.random() * 25;
        mover.x = x;
        mover.y = y;
        mover.vx = Math.cos(angle) * speed;
        mover.vy = Math.sin(angle) * speed;
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;
        return mover;
    });
}

function animate(time) {
    const seconds = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;

    movers.forEach((mover) => {
        let x = mover.x + mover.vx * seconds;
        let y = mover.y + mover.vy * seconds;
        const maxX = field.clientWidth - mover.radius;
        const maxY = field.clientHeight - mover.radius;

        if (x < mover.radius || x > maxX) mover.vx *= -1;
        if (y < mover.radius || y > maxY) mover.vy *= -1;
        x = Math.max(mover.radius, Math.min(maxX, x));
        y = Math.max(mover.radius, Math.min(maxY, y));

        if (isOverText(mover, x, y)) {
            mover.vx *= -1;
            mover.vy *= -1;
            return;
        }

        mover.x = x;
        mover.y = y;
        mover.object.style.left = `${x}px`;
        mover.object.style.top = `${y}px`;
    });

    requestAnimationFrame(animate);
}

placeObjects();
window.addEventListener("resize", placeObjects);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(animate);
