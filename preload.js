const path = require("path");
const { contextBridge } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("preload", {
  preloadAssets: () => {
    const assets = [
      "assets/0-FilledWaterGlass.svg",
      "assets/1-FilledWaterGlass.svg",
      "assets/2-FilledWaterGlass.svg",
      "assets/3-FilledWaterGlass.svg",
      "assets/4-FilledWaterGlass.svg",
      "assets/5-FilledWaterGlass.svg",
      "assets/6-FilledWaterGlass.svg",
      "assets/cloudySkyBg.svg",
      "assets/Flower.svg",
      "assets/Heart.svg",
      "assets/WaterDrop.svg",
      "assets/WaterDropEmpty.svg",
      "assets/PublicPixel-rv0pA.ttf",
      "assets/drinking-water-trim.mp3",
      "assets/mouse-click.mp3",
    ];

    assets.forEach((asset) => {
      fs.readFile(path.join(__dirname, asset), () => {});
    });
  },
});
