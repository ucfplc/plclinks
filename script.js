const shareButton = document.getElementById("shareButton");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message = "Link copied") {
  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

async function copyCurrentUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copied");
  } catch {
    const textArea = document.createElement("textarea");

    textArea.value = window.location.href;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();

    showToast("Link copied");
  }
}

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: "plcucf",
    text: "President's Leadership Council at UCF",
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  await copyCurrentUrl();
});
