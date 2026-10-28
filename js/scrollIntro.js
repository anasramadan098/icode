(() => {
    const intro = document.querySelector('#scrollIntro');
    const canvas = intro?.querySelector('canvas');
    const prompt = intro?.querySelector('.scroll-intro__prompt');

    if (!intro || !canvas || !prompt || !window.gsap || !window.ScrollTrigger) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = canvas.getContext('2d', { alpha: false });
    const frameCount = 240;
    const maxConcurrentLoads = 8;
    const frames = new Array(frameCount);
    const failedFrames = new Set();
    const pendingFrames = Array.from({ length: frameCount }, (_, index) => index);
    let activeLoads = 0;
    let currentFrame = 0;
    let pixelRatio = 1;
    let lastSortedFrame = -1;

    function drawFrame(index) {
        let frame = frames[index];

        if (!frame) {
            for (let distance = 1; distance < frameCount; distance += 1) {
                const before = index - distance;
                const after = index + distance;

                if (before >= 0 && frames[before]) {
                    frame = frames[before];
                    break;
                }

                if (after < frameCount && frames[after]) {
                    frame = frames[after];
                    break;
                }
            }
        }

        if (!frame || !context) {
            return;
        }

        const width = intro.clientWidth;
        const height = intro.clientHeight;
        const scale = Math.max(width / frame.naturalWidth, height / frame.naturalHeight);
        const drawWidth = frame.naturalWidth * scale;
        const drawHeight = frame.naturalHeight * scale;
        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        context.clearRect(0, 0, width, height);
        context.drawImage(frame, x, y, drawWidth, drawHeight);
    }

    function resizeCanvas() {
        pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(intro.clientWidth * pixelRatio);
        canvas.height = Math.round(intro.clientHeight * pixelRatio);
        context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        drawFrame(currentFrame);
    }

    function pumpFrameQueue() {
        if (pendingFrames.length === 0) {
            return;
        }

        if (lastSortedFrame !== currentFrame) {
            pendingFrames.sort((first, second) =>
                Math.abs(first - currentFrame) - Math.abs(second - currentFrame)
            );
            lastSortedFrame = currentFrame;
        }

        while (activeLoads < maxConcurrentLoads && pendingFrames.length > 0) {
            const index = pendingFrames.shift();

            if (frames[index] || failedFrames.has(index)) {
                continue;
            }

            activeLoads += 1;
            const image = new Image();
            image.decoding = 'async';
            image.onload = () => {
                frames[index] = image;
                activeLoads -= 1;
                drawFrame(currentFrame);
                pumpFrameQueue();
            };
            image.onerror = () => {
                failedFrames.add(index);
                activeLoads -= 1;
                pumpFrameQueue();
            };
            image.src = `imgs/videos_frames/frame_${String(index + 1).padStart(4, '0')}.webp`;
        }
    }

    resizeCanvas();
    pumpFrameQueue();

    const playhead = { frame: 0 };

    gsap.to(playhead, {
        frame: frameCount - 1,
        ease: 'none',
        onUpdate: () => {
            currentFrame = Math.round(playhead.frame);
            drawFrame(currentFrame);
            pumpFrameQueue();
        },
        scrollTrigger: {
            trigger: intro,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 2.5)}`,
            pin: true,
            scrub: 0.15,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    function hidePromptAfterScroll() {
        if (window.scrollY <= 0) {
            return;
        }

        window.removeEventListener('scroll', hidePromptAfterScroll);
        gsap.to(prompt, {
            autoAlpha: 0,
            duration: 0.45,
            ease: 'power2.out'
        });
    }

    window.addEventListener('scroll', hidePromptAfterScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
})();