const Timer = {
    convertMsToTime(ms) {
        let sec = Math.floor(ms / 1000);
        let min = Math.floor(sec / 60);
        
        sec = sec % 60;
        min = min % 60;
        
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }
}

export default Timer