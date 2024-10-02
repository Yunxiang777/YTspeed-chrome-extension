/**
 * 設置速度按鈕
 *
 */
function createButtonElement() {
  const resetButton = document.getElementById("Reset");
  playbackSpeeds.forEach((speed) => {
    const button = document.createElement("button");
    button.id = `speed-${speed}`;
    button.textContent = `${speed}x`;
    resetButton.insertAdjacentElement("afterend", button);
  });
}

//執行序列
createButtonElement();
