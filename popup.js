/**
 * 設置影片播放速度
 *
 * @param {number} speed - 要設置的播放速度
 */
function setPlaybackSpeed(speed) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].url.includes("youtube.com/watch"))
      return alert("Not a YouTube video page.");

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (speed) => {
        const video = document.querySelector("video");
        if (video) {
          if (!window.existingIntervals) {
            window.existingIntervals = [];
          }

          window.existingIntervals.forEach((id) => clearInterval(id));

          const intervalId = setInterval(
            () => (video.playbackRate = speed),
            10
          );
          window.existingIntervals.push(intervalId);
        }
      },
      args: [speed],
    });

    // 為所選按鈕添加紅色邊框
    const selectedButton = document.getElementById(`speed-${speed}`);
    const buttons = document.querySelectorAll("#button-container button");

    buttons.forEach((button) => {
      // 移除其他按鈕的紅色邊框
      button.style.border = "";
    });

    // 為當前選擇的按鈕添加紅色邊框
    selectedButton.style.border = "2px solid red";
  });
}

// 為每個播放速度設置點擊事件
playbackSpeeds.forEach((speed) =>
  document
    .getElementById(`speed-${speed}`)
    .addEventListener("click", () => setPlaybackSpeed(speed))
);

// 為播放速度 1 設置點擊事件 - Reset
document
  .getElementById(`Reset`)
  .addEventListener("click", () => setPlaybackSpeed(1));
