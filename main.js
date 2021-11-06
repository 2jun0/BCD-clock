const LED_STATE = {
  off: "off",
  on: "low-beam",
};

const hoursColumns = document.querySelectorAll("#hours-column-wrapper .column");
const minutesColumns = document.querySelectorAll(
  "#minutes-column-wrapper .column"
);
const secondsColumns = document.querySelectorAll(
  "#seconds-column-wrapper .column"
);

const clockTime = document.getElementById("clock-time");

let IntervalId;

function fillRest(str, len) {
  while (str.length < len) str = "0" + str;
  return str;
}

function setMode(mode) {
  document.querySelectorAll("led:not(.disabled)").forEach((el) => {
    el.className = LED_STATE[mode];
  });
}

function toogleLed(el, toogled) {
  if (toogled) {
    el.className = LED_STATE["on"];
  } else {
    el.className = LED_STATE["off"];
  }
}

function printHMS(hms, hmsColumns) {
  for (let i = 0; i < 2; i++) {
    let leds = hmsColumns[i].querySelectorAll("led");
    let bins = fillRest(Number.parseInt(hms[i]).toString(2), 4);

    // set p tag text
    hmsColumns[i].querySelector("#value").innerHTML = hms[i];

    for (let j = 0; j < 4; j++) toogleLed(leds[j], bins[j] == "1");
  }
}

function printHours(hours) {
  printHMS(hours, hoursColumns);
}
function printMinutes(minutes) {
  printHMS(minutes, minutesColumns);
}
function printSeconds(seconds) {
  printHMS(seconds, secondsColumns);
}

function printClock() {
  const dt = new Date();

  const hours = fillRest(dt.getHours().toString(), 2);
  const minutes = fillRest(dt.getMinutes().toString(), 2);
  const seconds = fillRest(dt.getSeconds().toString(), 2);

  printHours(hours);
  printMinutes(minutes);
  printSeconds(seconds);

  clockTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function init() {
  IntervalId = window.setInterval(() => {
    printClock();
  }, 1000);
}

init();
