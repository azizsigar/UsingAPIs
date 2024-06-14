'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPosition = startPos;
    img.style.left = currentPosition + 'px';

    const step = () => {
      currentPosition += STEP_SIZE_PX;
      img.style.left = currentPosition + 'px';

      if (currentPosition < stopPos) {
        setTimeout(step, STEP_INTERVAL_MS);
      } else {
        resolve();
      }
    };

    step();
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = originalSrc;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function startCatWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  const catWalk = async () => {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos, stopPos);
    startCatWalk(); // Recur to restart the process
  };

  catWalk();
}

window.addEventListener('load', startCatWalk);
