import React, { useEffect } from "react";
import p5 from "p5";

const DynamicSpaceShooter = () => {
	useEffect(() => {
		if (typeof window !== "undefined") {
			const sketch = (p) => {
				let player;
				const bullets = [];
				const enemies = [];

				p.preload = () => {
					// Load your spacecraft image here
					player = p.loadImage("/spaceship.png");
				};

				p.setup = () => {
					p.createCanvas(800, 600);
					player = {
						img: player, // Use 'img' property to store the image
						x: p.width / 2,
						y: p.height - 50,
						speed: 5,
					};
				};

				p.draw = () => {
					p.background(0);

					// Draw player spacecraft
					p.image(player.img, player.x, player.y, 60, 60);

					// Move and draw bullets
					for (let i = bullets.length - 1; i >= 0; i--) {
						bullets[i].y -= 5;
						p.fill(255, 0, 0);
						p.ellipse(bullets[i].x, bullets[i].y, 10, 10);

						if (bullets[i].y < 0) {
							bullets.splice(i, 1);
						}
					}

					// Generate enemies
					if (p.random(1) < 0.02) {
						enemies.push({ x: p.random(p.width), y: 0 });
					}

					// Move and draw enemies
					for (let i = enemies.length - 1; i >= 0; i--) {
						enemies[i].y += 3;
						p.fill(0, 0, 255);
						p.rect(enemies[i].x, enemies[i].y, 30, 30);

						// Check for collision with player
						if (
							player.x < enemies[i].x + 30 &&
							player.x + 60 > enemies[i].x &&
							player.y < enemies[i].y + 30 &&
							player.y + 60 > enemies[i].y
						) {
							p.noLoop();
							p.textSize(32);
							p.text("Game Over", p.width / 2 - 100, p.height / 2);
						}

						// Check for collision with bullets
						for (let j = bullets.length - 1; j >= 0; j--) {
							if (
								bullets[j].x < enemies[i].x + 30 &&
								bullets[j].x + 10 > enemies[i].x &&
								bullets[j].y < enemies[i].y + 30 &&
								bullets[j].y + 10 > enemies[i].y
							) {
								bullets.splice(j, 1);
								enemies.splice(i, 1);
							}
						}

						// Remove enemies that go off-screen
						if (enemies[i] && enemies[i].y > p.height) {
							enemies.splice(i, 1);
						}
					}
				};

				p.keyPressed = () => {
					if (p.key === " ") {
						bullets.push({ x: player.x + 25, y: player.y });
					}

					if (p.keyCode === p.LEFT_ARROW) {
						player.x -= player.speed;
					} else if (p.keyCode === p.RIGHT_ARROW) {
						player.x += player.speed;
					} else if (p.keyCode === p.UP_ARROW) {
						player.y -= player.speed;
					} else if (p.keyCode === p.DOWN_ARROW) {
						player.y += player.speed;
					}
				};
			};

			new p5(sketch);
		}
	}, []);

	return null;
};

export default DynamicSpaceShooter;
