;(function () {
    var STORAGE_KEY = 'birthday_audio_state';

    function restoreState(audio) {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return;

            var state = JSON.parse(raw);
            if (state && typeof state.time === 'number' && !isNaN(state.time)) {
                audio.currentTime = state.time;
            }

            if (state && state.paused === false) {
                var playPromise = audio.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(function () {
                        // ignore autoplay blocking errors
                    });
                }
            }
        } catch (e) {
            // ignore JSON / storage errors
        }
    }

    function saveState(audio) {
        try {
            var state = {
                time: audio.currentTime || 0,
                paused: audio.paused,
            };
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            // ignore storage errors
        }
    }

    function init() {
        var audio = document.getElementById('player');
        if (!audio) return;

        // Khôi phục trạng thái khi trang vừa load
        restoreState(audio);

        // Lưu trạng thái khi chuẩn bị rời trang
        window.addEventListener('beforeunload', function () {
            saveState(audio);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

