document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let timeLeft;
    let isRunning = false;
    let isFocusTime = true; 
    let focusDuration = 25 * 60; 
    let breakDuration = 5 * 60; 
            
    const timerDisplay = document.querySelector('.time');
    const modeText = document.getElementById('mode-text');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const timePresetSelect = document.getElementById('time-preset');
    const focusAlert = document.getElementById('focus-end-alert');
    const breakAlert = document.getElementById('break-end-alert');
    const timerSection = document.getElementById('timer-section');
                      
    resetTimer();
     startButton.addEventListener('click', startTimer);
     stopButton.addEventListener('click', stopTimer);
     resetButton.addEventListener('click', resetTimer);
     timePresetSelect.addEventListener('change', updateDurations);
            
    function updateDurations() {
        const preset = timePresetSelect.value;
        const [focus, breakTime] = preset.split('-').map(Number);
            focusDuration = focus * 60;
            breakDuration = breakTime * 60;
                if (!isRunning) {
                    resetTimer();
                }
    }
            
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(updateTimer, 1000);
                startButton.disabled = true;
        }
    }
            
    function stopTimer() {
        if (isRunning) {
           clearInterval(timer);
            isRunning = false;
                startButton.disabled = false;
        }
    }
            
    function resetTimer() {
         stopTimer();
         isFocusTime = true;
         timeLeft = focusDuration;
         updateDisplay();
         modeText.textContent = "FOCUS TIME";
         modeText.style.color = "white";
         timerSection.style.backgroundColor = "#3C467B";
         timerSection.style.animation = "none";
    }
            
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            startButton.disabled = false;
                    
                   
            if (isFocusTime) {
                focusAlert.play();
                twinkleEffect(true);
            } else {
                breakAlert.play();
                twinkleEffect(false);
            }
        }
    }
            
    function twinkleEffect(isFocusEnding) {
        const originalColor = isFocusEnding ? "#3C467B" : "#6E8CFB";
        const targetColor = isFocusEnding ? "#6E8CFB" : "#3C467B";
        const animationName = isFocusEnding ? "twinkle" : "twinkle-break";
                
            timerSection.style.animation = `${animationName} 0.5s ease-in-out 10`;
                
                setTimeout(() => {
                    timerSection.style.animation = "none";
                    timerSection.style.backgroundColor = targetColor;
                    
                    if (isFocusEnding) {
                        isFocusTime = false;
                        timeLeft = breakDuration;
                        modeText.textContent = "BREAK TIME";
                        modeText.style.color = "3C467B";
                    } else {
                        isFocusTime = true;
                        timeLeft = focusDuration;
                        modeText.textContent = "FOCUS TIME";
                        modeText.style.color = "white";
                    }
                    
                    updateDisplay();
                }, 5000); 
    }
            
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});
  