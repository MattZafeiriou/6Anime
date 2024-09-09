import { useEffect } from "react";
import Artplayer from 'artplayer';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import Hls from 'hls.js';

export default function VideoPlayer({ banner }) {

    let state = {
        video_url: "",
        episode: "",
        lastVolume: 0
    }

    useEffect(async () => {
        const id = window.location.href.split("/")[4].split("-")[window.location.href.split("/")[4].split("-").length - 1];
        state.episode = window.location.href.split("/")[5].replace("ep", "");

        // Change banner image
        var url = "/getanimeurl/?id=" + id + "&episode_number=" + state.episode;
        await fetch(process.env.NEXT_PUBLIC_API_URL + url)
            .then(res => res.text())
            .then(data => {
                data = JSON.parse(data);
                state.video_url = data.video_url;
            })
            .catch(error => {
                console.error('Error fetching anime url:', error);
            });

        var art = new Artplayer({
            container: '.artplayer-app',
            poster: banner,
            url: state.video_url,
            setting: true,
            isLive: false,
            muted: false,
            autoplay: false,
            autoSize: true,
            autoMini: false,
            screenshot: false,
            setting: true,
            loop: false,
            flip: false,
            playbackRate: true,
            fullscreen: true,
            fullscreenWeb: true,
            subtitleOffset: true,
            miniProgressBar: false,
            mutex: true,
            backdrop: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: 'var(--main)',
            plugins: [
                artplayerPluginHlsQuality({
                    // Show quality in control
                    control: false,

                    // Show quality in setting
                    setting: true,

                    // Get the resolution text from level
                    getResolution: (level) => level.height + 'P',

                    // I18n
                    title: 'Quality',
                    auto: 'Auto',
                }),
            ],
            customType: {
                m3u8: function playM3u8(video, url, art) {
                    if (Hls.isSupported()) {
                        if (art.hls) art.hls.destroy();
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        art.hls = hls;
                        art.on('destroy', () => hls.destroy());
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                    } else {
                        art.notice.show = 'Unsupported playback format: m3u8';
                    }
                }
            },
        });
    }, []);

    return (
        <>
        <div class="artplayer-app">
        </div>
        </>
    );
}