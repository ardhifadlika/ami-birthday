import { useRef, useState } from 'react'

export default function AmiBirthdayInvitation() {
  const pageRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLIFrameElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [imageSectionProgress, setImageSectionProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isOpening, setIsOpening] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)

  // Controls second popup flow after first surprise screen
  const [showSecondPopup, setShowSecondPopup] = useState(false)

  // Supabase public URL for dresscode image
  const dresscodeImage =
    'https://rglsaquiaoptymkxbwdf.supabase.co/storage/v1/object/public/image-asset/dresscode/ami%20dc.png'

  // Single memories video section
  // Replace this later with your real romantic video URL
  // Supabase public URL for memories video
  const memoryVideo =
    'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/birthday-assets/videos/memory-video.mp4'

  // Controls video playback state
  const memoryVideoRef = useRef<HTMLVideoElement>(null)
  const [isMemoryPlaying, setIsMemoryPlaying] = useState(false)

  const parallaxImages = {
    mobile: 'PASTE_MOBILE_BACKGROUND_IMAGE_URL_HERE',
    desktopLeft: 'PASTE_DESKTOP_LEFT_BACKGROUND_IMAGE_URL_HERE',
    desktopRight: 'PASTE_DESKTOP_RIGHT_BACKGROUND_IMAGE_URL_HERE',
  }

  const imageSectionImage =
    'https://rglsaquiaoptymkxbwdf.supabase.co/storage/v1/object/public/image-asset/background/Ours%202.png'

  const sectionNav = [
    { id: 'hero', label: 'Open' },
    { id: 'invitation', label: 'Invite' },
    { id: 'dresscode', label: 'Dress' },
    { id: 'schedule', label: 'Plan' },
    { id: 'memories', label: 'Memories' },
    { id: 'image-section', label: 'Image' },
    { id: 'letter', label: 'Note' },
    { id: 'surprise', label: 'Surprise' },
  ]

  const schedule = [
    {
      time: '13:00',
      title: 'Pickup My Princess',
      desc: 'Starting our special birthday date together 💕',
      iconUrl: 'PASTE_PICKUP_ICON_URL_HERE',
      iconAlt: 'Pickup icon',
    },
    {
      time: '14:00 - 18:00',
      title: 'Misc To Do',
      desc: 'Spending the afternoon together and making memories ✨',
      iconUrl: 'PASTE_ACTIVITY_ICON_URL_HERE',
      iconAlt: 'Activity icon',
    },
    {
      time: '18:30 - 19:00',
      title: 'Dinner Time',
      desc: 'Dinner together at MAISON TATSUYA Teppanyaki ❤️',
      iconUrl: 'PASTE_DINNER_ICON_URL_HERE',
      iconAlt: 'Dinner icon',
    },
    {
      time: '19:00 - End',
      title: 'Open The Gifts',
      desc: 'Ending the night with surprises made specially for you 🎁',
      iconUrl: 'PASTE_GIFT_ICON_URL_HERE',
      iconAlt: 'Gift icon',
    },
  ]

  const isPlaceholderUrl = (url: string) => url.includes('PASTE')

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePageScroll = () => {
    const page = pageRef.current

    if (!page) return

    const sectionIndex = Math.round(page.scrollTop / window.innerHeight)
    const section = sectionNav[Math.min(sectionNav.length - 1, Math.max(0, sectionIndex))]
    const maxScroll = page.scrollHeight - page.clientHeight
    const imageSectionIndex = sectionNav.findIndex(
      (item) => item.id === 'image-section',
    )
    const imageSectionStart = imageSectionIndex * window.innerHeight
    const imageToLetterProgress =
      (page.scrollTop - imageSectionStart) / window.innerHeight

    setActiveSection(section.id)
    setScrollProgress(maxScroll > 0 ? page.scrollTop / maxScroll : 0)
    setImageSectionProgress(Math.min(1, Math.max(0, imageToLetterProgress)))
  }

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

    // Reset second flow when popup closes
    if (showSurprise) {
      setShowSecondPopup(false)
      setShowCamera(false)
      setCapturedPhoto(null)
    }
  }

  // Open second popup state
  const handleNextSurprise = () => {
    setShowSecondPopup(true)
  }

  // Open front camera after user interaction
  const handleOpenCamera = async () => {
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
    } catch (error) {
      console.error('Camera permission denied:', error)
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
    const stream = video.srcObject as MediaStream | null

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    // Close live camera preview after capture
    setShowCamera(false)
  }

  // Play / pause memory video
  const toggleMemoryVideo = () => {
    if (!memoryVideoRef.current) return

    if (isMemoryPlaying) {
      memoryVideoRef.current.pause()
    } else {
      memoryVideoRef.current.play()
    }

    setIsMemoryPlaying(!isMemoryPlaying)
  }

  // Save captured birthday reaction image
  const handleSavePhoto = () => {
    if (!capturedPhoto) return

    const link = document.createElement('a')
    link.href = capturedPhoto
    link.download = 'ami-birthday-reaction.png'
    link.click()
  }

  // Retake photo by reopening front camera
  const handleRetakePhoto = async () => {
    setCapturedPhoto(null)

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
    } catch (error) {
      console.error('Camera permission denied:', error)
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.src =
        'https://www.youtube.com/embed/WCce-3XMdJs?autoplay=1&loop=1&playlist=WCce-3XMdJs'
    } else {
      audioRef.current.src =
        'https://www.youtube.com/embed/WCce-3XMdJs?autoplay=0&loop=1&playlist=WCce-3XMdJs'
    }

    setIsPlaying(!isPlaying)
  }

  return (
    // Main wrapper uses vertical snap scrolling.
    // Each section becomes a full-screen cinematic panel.
    <div
      ref={pageRef}
      onScroll={handlePageScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#ffeff6] text-[#4A2230] overflow-x-hidden font-sans relative"
    >
      {/* ROMANTIC MUSIC */}
      <iframe
        ref={audioRef}
        className="hidden"
        src="https://www.youtube.com/embed/WCce-3XMdJs?autoplay=1&loop=1&playlist=WCce-3XMdJs"
        title="Romantic Music"
        allow="autoplay; encrypted-media"
      />

      {/* FLOATING BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-0 w-56 h-56 bg-[#ff89bc]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#ffbcd9]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* PARALLAX IMAGE PLACEHOLDERS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 flex justify-center md:hidden">
          {isPlaceholderUrl(parallaxImages.mobile) ? (
            <div
              className="h-56 w-56 rounded-full border border-[#ffd6e7] bg-white/35 blur-[1px] transition-transform duration-300"
              style={{ transform: `translateY(${48 - scrollProgress * 52}px)` }}
            />
          ) : (
            <img
              src={parallaxImages.mobile}
              alt=""
              aria-hidden="true"
              className="h-[42vh] max-h-80 object-contain opacity-90 transition-transform duration-300"
              style={{ transform: `translateY(${40 - scrollProgress * 56}px)` }}
            />
          )}
        </div>

        <div className="hidden md:block">
          {isPlaceholderUrl(parallaxImages.desktopLeft) ? (
            <div
              className="absolute bottom-0 left-[calc(50%-33rem)] h-72 w-56 rounded-[32px] border border-[#ffd6e7] bg-white/30 blur-[1px] transition-transform duration-300"
              style={{ transform: `translateY(${32 - scrollProgress * 72}px)` }}
            />
          ) : (
            <img
              src={parallaxImages.desktopLeft}
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 left-[calc(50%-34rem)] h-[52vh] max-h-[520px] object-contain opacity-90 transition-transform duration-300"
              style={{ transform: `translateY(${32 - scrollProgress * 72}px)` }}
            />
          )}

          {isPlaceholderUrl(parallaxImages.desktopRight) ? (
            <div
              className="absolute bottom-0 right-[calc(50%-33rem)] h-72 w-56 rounded-[32px] border border-[#ffd6e7] bg-white/30 blur-[1px] transition-transform duration-300"
              style={{ transform: `translateY(${44 - scrollProgress * 92}px)` }}
            />
          ) : (
            <img
              src={parallaxImages.desktopRight}
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-[calc(50%-34rem)] h-[52vh] max-h-[520px] object-contain opacity-90 transition-transform duration-300"
              style={{ transform: `translateY(${44 - scrollProgress * 92}px)` }}
            />
          )}
        </div>
      </div>

      {/* DESKTOP SECTION NAV */}
      <nav
        aria-label="Birthday sections"
        className="group fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 rounded-full border border-white/70 bg-white/45 px-2 py-3 shadow-[0_18px_60px_rgba(255,112,174,0.18)] backdrop-blur-2xl transition-all duration-500 hover:rounded-[28px] hover:bg-white/75 hover:px-3 md:flex"
      >
        <div className="relative h-64 w-1 rounded-full bg-[#ffd6e7]">
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-[#ff70ae] transition-all duration-500"
            style={{
              height: `${
                ((sectionNav.findIndex((item) => item.id === activeSection) + 1) /
                  sectionNav.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          {sectionNav.map((item) => {
            const isActive = item.id === activeSection

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex h-8 origin-right items-center justify-end gap-2 rounded-full px-2 text-xs font-medium transition-all duration-500 ${
                  isActive
                    ? 'bg-[#ff70ae] text-white shadow-[0_10px_24px_rgba(255,112,174,0.28)]'
                    : 'text-[#8A5A68] hover:bg-[#ffeff6]'
                }`}
              >
                <span className="max-w-0 translate-x-3 overflow-hidden whitespace-nowrap opacity-0 blur-sm transition-all duration-500 group-hover:max-w-24 group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0">
                  {item.label}
                </span>
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-white' : 'bg-[#ff89bc]'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative z-10 min-h-screen snap-start flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-10 flex gap-2 text-xl animate-bounce">
          <span>💖</span>
          <span>✨</span>
          <span>🎀</span>
        </div>

        <p className="text-sm tracking-[0.3em] uppercase text-[#ff70ae] mb-6">
          For Ami ✨
        </p>

        <h1 className="text-[42px] sm:text-5xl leading-[1.1] font-serif max-w-md px-2">
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
        className="relative z-10 min-h-screen snap-start px-6 py-24 flex items-center justify-center"
      >
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#ffd6e7] rounded-[32px] p-8 shadow-[0_10px_50px_rgba(255,112,174,0.15)]">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            Birthday Invitation
          </p>

          <h2 className="text-[34px] sm:text-4xl font-serif leading-[1.15]">
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
              rel="noreferrer"
              className="w-full block bg-[#ff70ae] text-white py-3 rounded-full font-medium text-center hover:scale-105 transition-all"
            >
              Open Maps
            </a>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section id="dresscode" className="relative z-10 min-h-screen snap-start px-6 py-10 flex items-center">
        <div className="w-full max-w-[360px] sm:max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-[#ffd6e7] rounded-[32px] p-6 shadow-[0_10px_30px_rgba(255,112,174,0.08)]">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Dresscode
          </p>

          <h2 className="text-[34px] sm:text-4xl font-serif leading-[1.15] mb-6">
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
      <section id="schedule" className="relative z-10 min-h-screen snap-start px-6 py-10 flex items-center">
        <div className="w-full max-w-[360px] sm:max-w-md mx-auto">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Today's Plan
          </p>

          <h2 className="text-[34px] sm:text-4xl font-serif leading-[1.15] mb-10">
            Here's our little birthday schedule ✨
          </h2>

          <div className="space-y-5">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl border border-[#ffd6e7] rounded-[28px] p-5 shadow-[0_10px_30px_rgba(255,112,174,0.08)]"
              >
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-2xl border border-[#ffd6e7] bg-[#ffeff6] p-2 shadow-inner">
                    {item.iconUrl.includes('PASTE') ? (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/70 text-2xl">
                        ✨
                      </div>
                    ) : (
                      <img
                        src={item.iconUrl}
                        alt={item.iconAlt}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-[#ff70ae] font-medium text-sm text-right shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-[#8A5A68] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMORIES */}
      <section id="memories" className="relative z-10 min-h-screen snap-start px-6 py-10 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Memories
          </p>

          <h2 className="text-4xl md:text-6xl font-serif leading-tight max-w-2xl mb-12">
            Tiny moments that mean everything.
          </h2>

          {/* Romantic vertical video card */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[280px] sm:max-w-[320px] bg-white rounded-[32px] p-3 shadow-[0_10px_30px_rgba(255,112,174,0.12)]">
              <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden border-2 border-dashed border-[#ff89bc] bg-[#ffeff6]">
                {memoryVideo.includes('PASTE') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#ffbcd9] to-[#ffeff6]">
                    <div className="w-24 h-24 rounded-full bg-[#ffd6e7] flex items-center justify-center text-5xl shadow-inner mb-6">
                      🎬
                    </div>

                    <p className="text-[#ff70ae] font-medium text-base break-all">
                      {memoryVideo}
                    </p>

                    <p className="text-[#8A5A68] text-sm mt-4 leading-relaxed">
                      Paste your romantic memory video URL here.
                    </p>
                  </div>
                ) : (
                  <video
                    ref={memoryVideoRef}
                    src={memoryVideo}
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />
                )}

                </div>

              {/* External video play control */}
              <div className="flex justify-center mt-5">
                <button
                  onClick={toggleMemoryVideo}
                  className="w-14 h-14 rounded-full bg-[#ff70ae] text-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,112,174,0.25)] hover:scale-110 transition-all"
                >
                  {isMemoryPlaying ? '⏹' : '▶'}
                </button>
              </div>            </div>
          </div>
        </div>
      </section>

      {/* IMAGE SECTION */}
      <section
        id="image-section"
        className="relative z-10 min-h-screen snap-start overflow-hidden px-6 py-12 flex items-center justify-center"
      >
        <img
          src={imageSectionImage}
          alt="A birthday memory together"
          className="h-[82vh] max-h-[760px] w-auto max-w-[92vw] object-contain transition-transform duration-500 ease-out md:max-w-[58vw]"
          style={{
            transform: `translate3d(0, ${imageSectionProgress * -72}px, 0) scale(${
              1 + imageSectionProgress * 0.035
            })`,
          }}
        />
      </section>

      {/* LETTER */}
      <section
        id="letter"
        className="relative z-10 min-h-screen snap-start overflow-hidden px-6 py-16 flex items-center"
      >
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          <div className="flex justify-center md:justify-start">
            <img
              src={imageSectionImage}
              alt="A birthday memory together"
              className="h-[44vh] max-h-[520px] w-auto max-w-[82vw] object-contain transition-transform duration-500 ease-out md:h-[68vh] md:max-w-full"
              style={{
                transform: `translate3d(0, ${
                  -96 + imageSectionProgress * 72
                }px, 0) scale(${1.04 - imageSectionProgress * 0.04})`,
              }}
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
              A Little Note
            </p>

            <h2 className="text-[34px] sm:text-4xl font-serif leading-[1.15] mb-8">
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
        </div>
      </section>

      {/* SURPRISE */}
      <section id="surprise" className="relative z-10 min-h-screen snap-start px-6 pb-32 text-center flex items-center justify-center">
        <div className="text-center w-full max-w-[340px] sm:max-w-sm mx-auto">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            One More Thing Before Tonight 💕
          </p>

          <h2 className="text-[34px] sm:text-4xl font-serif leading-[1.15] mb-5">
            Before Our Date Begins...
          </h2>

          <p className="text-[#8A5A68] leading-relaxed mb-10">
            I prepared one last tiny surprise before I pick you up ✨
          </p>

          <button
            onClick={handleSurprise}
            className="bg-[#ff70ae] text-white px-7 py-3.5 rounded-full font-medium shadow-[0_10px_30px_rgba(255,112,174,0.3)] hover:scale-105 transition-all"
          >
            Press Me Princess 👀
          </button>
        </div>

        {showSurprise && (
          <div
            onClick={handleSurprise}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] sm:max-w-md bg-white rounded-[32px] p-5 sm:p-6 text-left shadow-[0_20px_80px_rgba(255,112,174,0.25)] max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={handleSurprise}
                className="absolute -top-14 right-0 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#ff70ae] shadow-[0_10px_30px_rgba(255,112,174,0.15)] hover:scale-110 transition-all"
              >
                ✕
              </button>

              <div className="bg-[#ffeff6] border border-[#ffd6e7] rounded-[28px] p-5 mb-4">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-dashed border-[#ff89bc] bg-white relative flex items-center justify-center">
                  {showCamera ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : capturedPhoto ? (
                    <img
                      src={capturedPhoto}
                      alt="Birthday Reaction"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-6">
                      <div className="w-24 h-24 rounded-full bg-[#ffd6e7] flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
                        📸
                      </div>

                      <p className="text-[#ff70ae] text-xs tracking-[0.25em] uppercase mb-3">
                        Tiny Birthday Photo Booth
                      </p>

                      <h3 className="text-3xl font-serif leading-tight text-[#4A2230] mb-4">
                        Please show your cute face 🥺
                      </h3>

                      <p className="text-[#8A5A68] text-sm leading-relaxed">
                        I spent a lot of time making this little website for you...
                        so can I see your pretty reaction first? 👉🏻👈🏻💕
                      </p>

                      <p className="text-[#ff70ae] text-xs mt-5 tracking-wide uppercase">
                        This moment deserves to be remembered ✨
                      </p>
                    </div>
                  )}
                </div>

                {!showCamera && !capturedPhoto && (
                  <button
                    onClick={handleOpenCamera}
                    className="w-full mt-5 bg-[#ff70ae] text-white py-3.5 rounded-full font-medium shadow-[0_10px_30px_rgba(255,112,174,0.2)] hover:scale-[1.02] transition-all"
                  >
                    OK fine.. Open Camera 📸
                  </button>
                )}

                {showCamera && (
                  <button
                    onClick={handleCapturePhoto}
                    className="w-full mt-5 bg-[#ff70ae] text-white py-3.5 rounded-full font-medium shadow-[0_10px_30px_rgba(255,112,174,0.2)] hover:scale-[1.02] transition-all"
                  >
                    Take Picture 📸
                  </button>
                )}

                {capturedPhoto && (
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={handleSavePhoto}
                      className="flex-1 bg-[#ff70ae] text-white py-3.5 rounded-full font-medium shadow-[0_10px_30px_rgba(255,112,174,0.2)] hover:scale-[1.02] transition-all"
                    >
                      Save 💖
                    </button>

                    <button
                      onClick={handleRetakePhoto}
                      className="flex-1 bg-[#ffeff6] border border-[#ffd6e7] text-[#ff70ae] py-3.5 rounded-full font-medium hover:scale-[1.02] transition-all"
                    >
                      Retake 📸
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MUSIC BUTTON */}
      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ff70ae] text-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,112,174,0.35)] hover:scale-110 transition-all z-50"
      >
        {isPlaying ? '🎵' : '🎶'}
      </button>
    </div>
  )
}
