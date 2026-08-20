// ==========================================
// UCF DAY OF GIVING COUNTDOWN
// April 8, 2027
// Midnight Eastern Time
// ==========================================

const DAY_OF_GIVING =
  new Date("2027-04-08T00:00:00-04:00").getTime();

const daysEl =
  document.getElementById("days");

const hoursEl =
  document.getElementById("hours");

const minutesEl =
  document.getElementById("minutes");

const secondsEl =
  document.getElementById("seconds");


function pad(value, length = 2) {
  return String(value).padStart(length, "0");
}


function updateCountdown() {
  const remaining =
    DAY_OF_GIVING - Date.now();


  if (remaining <= 0) {
    daysEl.textContent = "000";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    return;
  }


  const days =
    Math.floor(
      remaining / 86400000
    );


  const hours =
    Math.floor(
      (remaining % 86400000) /
      3600000
    );


  const minutes =
    Math.floor(
      (remaining % 3600000) /
      60000
    );


  const seconds =
    Math.floor(
      (remaining % 60000) /
      1000
    );


  daysEl.textContent =
    pad(days, 3);

  hoursEl.textContent =
    pad(hours);

  minutesEl.textContent =
    pad(minutes);

  secondsEl.textContent =
    pad(seconds);
}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);



// ==========================================
// SHARE BUTTON
// ==========================================

const shareButton =
  document.getElementById("shareButton");

const toast =
  document.getElementById("toast");

let toastTimer;


function showToast() {
  toast.classList.add("visible");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 1600);
}


async function copyUrl() {

  try {

    await navigator.clipboard.writeText(
      window.location.href
    );

    showToast();

  } catch {

    const helper =
      document.createElement("textarea");

    helper.value =
      window.location.href;

    helper.setAttribute(
      "readonly",
      ""
    );

    helper.style.position =
      "fixed";

    helper.style.opacity =
      "0";


    document.body.appendChild(
      helper
    );


    helper.select();

    document.execCommand(
      "copy"
    );


    helper.remove();

    showToast();
  }
}


shareButton.addEventListener(
  "click",
  async () => {

    if (navigator.share) {

      try {

        await navigator.share({
          title:
            "UCF President's Leadership Council",

          text:
            "Official UCF President's Leadership Council links",

          url:
            window.location.href
        });

        return;

      } catch (error) {

        if (
          error.name ===
          "AbortError"
        ) {
          return;
        }
      }
    }


    await copyUrl();
  }
);
