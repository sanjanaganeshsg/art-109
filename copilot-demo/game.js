const gameArea = document.querySelector("#game-area");
const player = document.querySelector("#player");
const scoreOutput = document.querySelector("#score");

const fallingStrawberries = [];
let playerX = gameArea.clientWidth / 2;
let score = 0;
let previousFrame = 0;
let previousStrawberryX = null;

function playerWidth() {
    return player.getBoundingClientRect().width;
}

function placePlayer() {
    const halfWidth = playerWidth() / 2;
    playerX = Math.max(halfWidth, Math.min(gameArea.clientWidth - halfWidth, playerX));
    player.style.left = `${playerX}px`;
}

function movePlayer(direction) {
    const playerStep = Math.max(36, gameArea.clientWidth * 0.07);
    playerX += direction * playerStep;
    placePlayer();
}

window.addEventListener("keydown", (event) => {
    const key = event.key === "ArrowLeft" || event.code === "ArrowLeft"
        ? "ArrowLeft"
        : event.key === "ArrowRight" || event.code === "ArrowRight"
            ? "ArrowRight"
            : null;

    if (key) {
        event.preventDefault();
        movePlayer(key === "ArrowLeft" ? -1 : 1);
    }
}, { capture: true });

window.addEventListener("resize", placePlayer);
player.addEventListener("load", placePlayer, { once: true });

function spawnStrawberry() {
    const berry = document.createElement("img");
    berry.src = "Strawberry.png";
    berry.alt = "";
    berry.draggable = false;
    berry.className = "falling-strawberry";

    gameArea.append(berry);

    const maxX = Math.max(0, gameArea.clientWidth - berry.offsetWidth);
    let x = Math.random() * maxX;
    const minimumGap = maxX * 0.25;
    if (previousStrawberryX !== null && Math.abs(x - previousStrawberryX) < minimumGap) {
        const leftRange = Math.max(0, previousStrawberryX - minimumGap);
        const rightStart = Math.min(maxX, previousStrawberryX + minimumGap);
        const rightRange = maxX - rightStart;
        const availableRange = leftRange + rightRange;
        const position = Math.random() * availableRange;
        x = position < leftRange
            ? Math.random() * leftRange
            : rightStart + Math.random() * rightRange;
    }
    previousStrawberryX = x;
    berry.style.left = `${x}px`;

    fallingStrawberries.push({
        element: berry,
        x,
        y: -berry.getBoundingClientRect().height,
        speed: 150 + Math.random() * 130
    });

    window.setTimeout(spawnStrawberry, 450 + Math.random() * 850);
}

function intersects(first, second) {
    return first.left < second.right
        && first.right > second.left
        && first.top < second.bottom
        && first.bottom > second.top;
}

function animate(timestamp) {
    const delta = previousFrame ? Math.min((timestamp - previousFrame) / 1000, 0.05) : 0;
    previousFrame = timestamp;

    const playerBounds = player.getBoundingClientRect();

    for (let index = fallingStrawberries.length - 1; index >= 0; index -= 1) {
        const strawberry = fallingStrawberries[index];
        strawberry.y += strawberry.speed * delta;
        strawberry.element.style.top = `${strawberry.y}px`;

        if (intersects(playerBounds, strawberry.element.getBoundingClientRect())) {
            strawberry.element.remove();
            fallingStrawberries.splice(index, 1);
            score += 1;
            scoreOutput.textContent = score;
        } else if (strawberry.y > gameArea.clientHeight) {
            strawberry.element.remove();
            fallingStrawberries.splice(index, 1);
        }
    }

    window.requestAnimationFrame(animate);
}

placePlayer();
window.setTimeout(spawnStrawberry, 350);
window.requestAnimationFrame(animate);
