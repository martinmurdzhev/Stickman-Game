const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    velocityY: 0,
    jumping: false
};

const gravity = 0.7;
const jumpPower = -12;

function update() {
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Ground collision
    if (player.y >= 300) {
        player.y = 300;
        player.velocityY = 0;
        player.jumping = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = "green";
    ctx.fillRect(0, 350, canvas.width, 50);

    // Stickman
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;

    // Head
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(player.x + 15, player.y + 10);
    ctx.lineTo(player.x + 15, player.y + 35);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(player.x + 15, player.y + 35);
    ctx.lineTo(player.x, player.y + 50);
    ctx.moveTo(player.x + 15, player.y + 35);
    ctx.lineTo(player.x + 30, player.y + 50);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(player.x + 15, player.y + 15);
    ctx.lineTo(player.x, player.y + 25);
    ctx.moveTo(player.x + 15, player.y + 15);
    ctx.lineTo(player.x + 30, player.y + 25);
    ctx.stroke();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !player.jumping) {
        player.velocityY = jumpPower;
        player.jumping = true;
    }
});

gameLoop();
