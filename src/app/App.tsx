import { useRef, useState } from 'react'

export default function App() {
  const audioRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const memoryVideoRef = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const dresscodeImage = 'https://rglsaquiaoptymkxbwdf.supabase.co/storage/v1/object/public/image-asset/ami%20dc.png'

  const memoryVideo = 'PASTE_VIDEO_LINK_HERE'

  const schedule = [
    {
      time: '13:00',
      title: 'Pickup My Princess',
      desc: 'Starting our special birthday date together 💕',
    },
    {
      time: '14:00 - 18:00',
      title: 'Misc To Do',
      desc: 'Spending the afternoon together and making memories ✨',
    },
    {
      time: '18:30 - 19:00',
      title: 'Dinner Time',
      desc: 'Dinner together at MAISON TATSUYA Teppanyaki ❤️',
    },
    {
      time: '19:00 - End',
      title: 'Open The Gifts',
      desc: 'Ending the night with surprises made specially for you 🎁',
    },
  ]

  const handleOpenInvitation = () => {
    setIsOpening(true)

    setTimeout(() => {
      document
        .getElementById('invitation')
        ?.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        setIsOpening(false)
      }, 1200)
    }, 600)
  }

  const handleSurprise = () => {
    setShowSurprise((prev) => !prev)
    if (showSurprise) {
      // Reset states when closing
      setCameraError(null)
      setShowCamera(false)
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  // Open front camera after user interaction
  const handleOpenCamera = async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setShowCamera(true)

      // Auto capture after a few seconds
      setTimeout(() => {
        handleCapturePhoto()
      }, 4000)
    } catch (error) {
      // Handle camera errors silently with user-friendly messages
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setCameraError('Camera permission was denied. Please allow camera access to capture your reaction 📸')
        } else if (error.name === 'NotFoundError') {
          setCameraError('No camera found on this device 📷')
        } else {
          setCameraError('Could not access camera. Please try again or skip this step.')
        }
      } else {
        setCameraError('Could not access camera. Please try again or skip this step.')
      }
    }
  }

  // Capture photo from webcam video
  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')

    if (!context) return

    context.drawImage(video, 0, 0)

    const image = canvas.toDataURL('image/png')

    setCapturedPhoto(image)

    // Stop webcam stream after capture
    const stream = video.srcObject as MediaStream

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.src =
        'https://youtu.be/OPugs48z2GU?si=TpN4_338RnzYsQa9'
    } else {
      audioRef.current.src =
        'https://youtu.be/OPugs48z2GU?si=TpN4_338RnzYsQa9'
    }

    setIsPlaying(!isPlaying)
  }

  const toggleVideo = () => {
    if (!memoryVideoRef.current) return

    if (isVideoPlaying) {
      memoryVideoRef.current.pause()
    } else {
      memoryVideoRef.current.play()
    }

    setIsVideoPlaying(!isVideoPlaying)
  }

  return (
    <div className="min-h-screen bg-[#ffeff6] text-[#4A2230] overflow-x-hidden font-sans relative">
      {/* ROMANTIC MUSIC */}
      <iframe
        ref={audioRef}
        className="hidden"
        src="https://youtu.be/OPugs48z2GU?si=TpN4_338RnzYsQa9"
        title="Romantic Music"
        allow="autoplay"
      />

      {/* FLOATING BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-0 w-56 h-56 bg-[#ff89bc]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#ffbcd9]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-10 flex gap-2 text-xl animate-bounce">
          <span>💖</span>
          <span>✨</span>
          <span>🎀</span>
        </div>

        <p className="text-sm tracking-[0.3em] uppercase text-[#ff70ae] mb-6">
          For Ami ✨
        </p>

        <h1 className="text-5xl leading-tight font-serif max-w-md">
          Someone planned a special birthday night for you.
        </h1>

        <p className="text-[#8A5A68] mt-6 text-lg max-w-sm leading-relaxed">
          Open this invitation when you're ready for your special day 💕
        </p>

        <button
          onClick={handleOpenInvitation}
          className="relative mt-10 bg-[#ff70ae] text-white px-8 py-4 rounded-full text-sm font-medium active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,112,174,0.35)] hover:scale-105 overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Open Invitation 💌
          </span>

          <div className="absolute inset-0 bg-white/20 scale-x-0 group-active:scale-x-100 origin-left transition-transform duration-500" />

          {isOpening && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#ff70ae] animate-pulse z-20">
              <div className="flex gap-2 text-lg animate-bounce">
                <span>💖</span>
                <span>✨</span>
                <span>💌</span>
              </div>
            </div>
          )}
        </button>

        <div
          className={`absolute inset-0 bg-[#ffd6e7]/20 backdrop-blur-2xl transition-opacity duration-700 pointer-events-none ${
            isOpening ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </section>

      {/* INVITATION */}
      <section
        id="invitation"
        className="relative px-6 py-24 flex justify-center"
      >
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#ffd6e7] rounded-[32px] p-8 shadow-[0_10px_50px_rgba(255,112,174,0.15)]">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            Birthday Invitation
          </p>

          <h2 className="text-4xl font-serif leading-tight">
            Ami's 24th Birthday
          </h2>

          <div className="mt-8 space-y-5 text-lg text-[#5E3542]">
            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4">
              <span>📅</span>
              <p>8 June 2026</p>
            </div>

            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4">
              <span>🕖</span>
              <p>13:00</p>
            </div>

            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4">
              <span>📍</span>
              <p>MAISON TATSUYA Teppanyaki Summarecon Bekasi</p>
            </div>
          </div>

          <p className="mt-8 text-[#8A5A68] leading-relaxed">
            I already planned everything for us ❤️
          </p>

          <div className="mt-8">
            <a
              href="https://maps.app.goo.gl/WXDou4CoJxN9cbbr9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block bg-[#ff70ae] text-white py-3 rounded-full font-medium text-center hover:scale-105 transition-all"
            >
              Open Maps
            </a>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-[#ffd6e7] rounded-[32px] p-6 shadow-[0_10px_30px_rgba(255,112,174,0.08)]">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Dresscode
          </p>

          <h2 className="text-4xl font-serif leading-tight mb-6">
            Pink and Jeans 💖
          </h2>

          <div className="aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-dashed border-[#ff89bc] bg-[#ffeff6] relative">
            {dresscodeImage.includes('PASTE') ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#ffbcd9] to-[#ffeff6]">
                <div className="w-20 h-20 rounded-full bg-[#ffd6e7] flex items-center justify-center text-3xl shadow-inner mb-5">
                  👗
                </div>

                <p className="text-[#ff70ae] font-medium text-base break-all">
                  {dresscodeImage}
                </p>

                <p className="text-[#8A5A68] text-sm mt-3 leading-relaxed">
                  Paste your dresscode inspiration image link here.
                </p>
              </div>
            ) : (
              <img
                src={dresscodeImage}
                alt="Dresscode"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="mt-5 bg-[#ffeff6] border border-[#ffd6e7] rounded-2xl p-4 text-center">
            Pink top + jeans / white bottom ✨
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Today's Plan
          </p>

          <h2 className="text-4xl font-serif leading-tight mb-10">
            Here's our little birthday schedule ✨
          </h2>

          <div className="space-y-5">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl border border-[#ffd6e7] rounded-[28px] p-5 shadow-[0_10px_30px_rgba(255,112,174,0.08)]"
              >
                <div className="flex items-center justify-between mb-3 gap-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-[#ff70ae] font-medium text-sm text-right">
                    {item.time}
                  </span>
                </div>

                <p className="text-[#8A5A68] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMORIES */}
      <section className="py-10 px-6">
        <div className="max-w-md mx-auto text-center mb-8">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Memories
          </p>

          <h2 className="text-4xl font-serif leading-tight">
            Tiny moments that mean everything.
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-[28px] p-3 shadow-[0_10px_30px_rgba(255,112,174,0.12)]">
            <div className="aspect-[9/16] rounded-[20px] overflow-hidden border-2 border-dashed border-[#ff89bc] relative bg-[#ffeff6]">
              {memoryVideo.includes('PASTE') ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#ffbcd9] to-[#ffeff6]">
                  <div className="w-20 h-20 rounded-full bg-[#ffd6e7] flex items-center justify-center text-3xl shadow-inner mb-5">
                    🎥
                  </div>

                  <p className="text-[#ff70ae] font-medium text-base break-all">
                    {memoryVideo}
                  </p>

                  <p className="text-[#8A5A68] text-sm mt-3 leading-relaxed">
                    Paste your video URL here.
                  </p>
                </div>
              ) : (
                <>
                  <video
                    ref={memoryVideoRef}
                    src={memoryVideo}
                    className="w-full h-full object-cover"
                    onClick={toggleVideo}
                  >
                    Your browser does not support the video tag.
                  </video>

                  <button
                    onClick={toggleVideo}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#ff70ae]/90 backdrop-blur-sm text-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,112,174,0.4)] hover:scale-110 transition-all z-10"
                  >
                    {isVideoPlaying ? '⏸' : '▶️'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LETTER */}
      <section className="px-6 py-24">
        <div className="max-w-md mx-auto text-center">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            A Little Note
          </p>

          <h2 className="text-4xl font-serif leading-tight mb-8">
            Happy Birthday, Ami 💖
          </h2>

          <div className="space-y-6 text-[#6D4552] leading-8 text-lg">
            <p>
              Thank you for always being my safest place, my favorite person,
              and the prettiest part of my days.
            </p>

            <p>
              I hope this birthday becomes one of the happiest memories for
              you.
            </p>

            <p>
              And tonight, I just want to spend every little moment with you ❤️
            </p>

            <div className="pt-8 text-right border-t border-[#ffd6e7] mt-8">
              <p className="text-[#8A5A68] italic mb-2">With Love,</p>

              <p className="font-serif text-2xl text-[#ff70ae]">
                Ardhi Satria
              </p>

              <p className="text-sm text-[#8A5A68] mt-1">
                8 June 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SURPRISE */}
      <section className="px-6 pb-32 text-center">
        <button
          onClick={handleSurprise}
          className="bg-[#ff70ae] text-white px-8 py-4 rounded-full font-medium shadow-[0_10px_30px_rgba(255,112,174,0.3)] hover:scale-105 transition-all"
        >
          Unlock Surprise ✨
        </button>

        {showSurprise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-white rounded-[32px] p-6 text-left shadow-[0_20px_80px_rgba(255,112,174,0.25)]">
              <button
                onClick={handleSurprise}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#ffeff6] flex items-center justify-center text-[#ff70ae]"
              >
                ✕
              </button>

              <div className="aspect-[4/3] rounded-[20px] bg-gradient-to-b from-[#ffbcd9] to-[#ffeff6] flex items-center justify-center text-6xl mb-6 shadow-inner">
                🎁
              </div>

              <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
                Surprise Unlocked
              </p>

              <h3 className="text-3xl font-serif leading-tight mb-4 text-[#4A2230]">
                Thank you for being born.
              </h3>

              <div className="space-y-4 text-[#6D4552] leading-7">
                {!showCamera && !capturedPhoto && (
                  <div className="bg-[#ffeff6] border border-[#ffd6e7] rounded-[24px] p-5 text-center mb-6">
                    <p className="text-lg leading-relaxed mb-5">
                      Before you continue... can I see the birthday girl's reaction? 📸
                    </p>

                    {cameraError && (
                      <div className="mb-4 bg-white border border-[#ff89bc] rounded-2xl p-4 text-sm text-[#8A5A68]">
                        {cameraError}
                      </div>
                    )}

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleOpenCamera}
                        className="bg-[#ff70ae] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-all"
                      >
                        {cameraError ? 'Try Again' : 'Open Camera 💖'}
                      </button>
                    </div>
                  </div>
                )}

                {showCamera && !capturedPhoto && (
                  <div className="mb-6">
                    <div className="relative rounded-[24px] overflow-hidden border-4 border-[#ffd6e7] shadow-[0_10px_30px_rgba(255,112,174,0.15)]">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full aspect-[3/4] object-cover"
                      />

                      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                        <div className="flex justify-between text-white text-xl">
                          <span>💖</span>
                          <span>✨</span>
                        </div>

                        <div className="bg-black/30 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full self-center">
                          Capturing your reaction...
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {capturedPhoto && capturedPhoto !== 'skipped' && (
                  <div className="mb-6 bg-[#ffeff6] rounded-[28px] p-4 border border-[#ffd6e7] shadow-[0_10px_30px_rgba(255,112,174,0.1)]">
                    <img
                      src={capturedPhoto}
                      alt="Birthday Reaction"
                      className="rounded-[20px] w-full aspect-[3/4] object-cover"
                    />

                    <div className="mt-4 text-center">
                      <p className="text-[#ff70ae] font-serif text-2xl">
                        My Favorite Reaction 💕
                      </p>

                      <p className="text-[#8A5A68] text-sm mt-2">
                        Captured on Ami's 24th Birthday ✨
                      </p>
                    </div>
                  </div>
                )}
                <p>
                  This little website is only a tiny part of how special you are
                  to me.
                </p>

                <p>
                  Tonight is about celebrating your smile, your happiness, and
                  every beautiful thing about you 💕
                </p>

                <p>
                  And yes... there are still real surprises waiting for you
                  later 🎀
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MUSIC BUTTON */}
      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#ff70ae] text-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,112,174,0.35)] hover:scale-110 transition-all z-50"
      >
        {isPlaying ? '🎵' : '🎶'}
      </button>
    </div>
  )
}
