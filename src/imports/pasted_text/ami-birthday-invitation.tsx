import { useRef, useState } from 'react'

export default function AmiBirthdayInvitation() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
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
    setShowSurprise(!showSurprise)

    if (!showSurprise) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.src =
        'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk'
    } else {
      audioRef.current.src =
        'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&loop=1&playlist=jfKfPfyJRdk'
    }

    setIsPlaying(!isPlaying)
  }

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

  return (
    <div className="min-h-screen bg-[#ffeff6] text-[#4A2230] overflow-x-hidden font-sans relative">
      {/* ROMANTIC MUSIC */}
      <iframe
        ref={audioRef}
        className="hidden"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&loop=1&playlist=jfKfPfyJRdk"
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
            Open Invitation
            <span
              className={`${isOpening ? 'translate-x-1' : ''} transition-transform duration-300`}
            >
              💌
            </span>
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

        <div className="absolute bottom-10 animate-bounce text-[#8A5A68] text-sm">
          Scroll ↓
        </div>
      </section>

      {/* INVITATION */}
      <section
        id="invitation"
        className="relative px-6 py-24 flex justify-center"
      >
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#ffd6e7] rounded-[32px] p-8 shadow-[0_10px_50px_rgba(255,112,174,0.15)] hover:-translate-y-1 transition-transform duration-300">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            Birthday Invitation
          </p>

          <h2 className="text-4xl font-serif leading-tight">
            Ami's 24th Birthday
          </h2>

          <div className="mt-8 space-y-5 text-lg text-[#5E3542]">
            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4 hover:scale-[1.02] transition-transform">
              <span>📅</span>
              <p>8 June 2026</p>
            </div>

            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4 hover:scale-[1.02] transition-transform">
              <span>🕖</span>
              <p>13:00</p>
            </div>

            <div className="flex items-center gap-3 bg-[#ffeff6] rounded-2xl px-4 py-4 hover:scale-[1.02] transition-transform">
              <span>📍</span>
              <p>MAISON TATSUYA Teppanyaki Summarecon Bekasi</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-[#8A5A68] leading-relaxed">
              I already planned everything for us ❤️
            </p>

            <div className="bg-[#ffeff6] border border-[#ffd6e7] rounded-2xl p-4 text-left">
              <p className="text-[#ff70ae] text-sm uppercase tracking-[0.2em] mb-2">
                Dresscode
              </p>

              <p className="text-[#6D4552] leading-relaxed">
                Pink and white outfit ✨
                <br />
                White bottom, pink top 💖
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <a
              href="https://maps.app.goo.gl/WXDou4CoJxN9cbbr9"
              target="_blank"
              className="flex-1 bg-[#ff70ae] text-white py-3 rounded-full font-medium active:scale-95 transition-all hover:scale-105 text-center"
            >
              Open Maps
            </a>

            <button className="flex-1 border border-[#ff89bc] text-[#ff70ae] py-3 rounded-full font-medium active:scale-95 transition-all hover:bg-[#ffeff6]">
              Save Date
            </button>
          </div>
        </div>
      </section>

      {/* TODAY SCHEDULE */}
      <section className="px-6 py-10">
        <div className="max-w-md mx-auto">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Tonight's Plan
          </p>

          <h2 className="text-4xl font-serif leading-tight mb-10">
            Here's our little birthday schedule ✨
          </h2>

          <div className="space-y-5">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl border border-[#ffd6e7] rounded-[28px] p-5 hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(255,112,174,0.08)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-[#ff70ae] font-medium">
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

      {/* ABOUT SECTION */}
      <section className="px-6 py-24">
        <div className="max-w-md mx-auto bg-gradient-to-b from-[#ffbcd9]/80 to-white rounded-[32px] p-8 border border-[#ffd6e7] shadow-[0_10px_40px_rgba(255,112,174,0.12)]">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-4">
            About Tonight
          </p>

          <h2 className="text-4xl font-serif leading-tight mb-8">
            Just us, beautiful moments, and your special day 💕
          </h2>

          <div className="space-y-5 text-[#6D4552] leading-8 text-lg">
            <p>
              Tonight is all about celebrating you, your smile, and every
              little thing that makes you special.
            </p>

            <p>
              I wanted to create a night where you can feel loved, appreciated,
              and happy from beginning to end.
            </p>

            <p>
              So wear your prettiest smile and let me take care of the rest ✨
            </p>
          </div>
        </div>
      </section>

      {/* MEMORY GALLERY */}
      <section className="py-10">
        <div className="px-6 mb-8">
          <p className="text-[#ff70ae] text-sm tracking-[0.25em] uppercase mb-3">
            Memories
          </p>

          <h2 className="text-4xl font-serif max-w-xs leading-tight">
            Tiny moments that mean everything.
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {[
            {
              title: 'our favorite day ✨',
              note: 'Place your photo here',
            },
            {
              title: 'still my favorite person 💕',
              note: 'Place your photo here',
            },
            {
              title: 'another beautiful memory 🎀',
              note: 'Place your photo here',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] bg-white rounded-[28px] p-3 text-black snap-center shadow-[0_10px_30px_rgba(255,112,174,0.12)] hover:rotate-1 transition-all duration-300"
            >
              <div className="aspect-[4/5] rounded-[20px] bg-gradient-to-b from-[#ffbcd9] to-[#ffeff6] overflow-hidden group border-2 border-dashed border-[#ff89bc] flex flex-col items-center justify-center text-center p-6 relative">
                <div className="absolute top-4 right-4 text-xl opacity-70">
                  📸
                </div>

                <div className="w-20 h-20 rounded-full bg-[#ffd6e7] flex items-center justify-center text-3xl shadow-inner mb-5 group-hover:scale-110 transition-transform duration-300">
                  💖
                </div>

                <p className="text-[#ff70ae] font-medium text-lg">
                  {item.note}
                </p>

                <p className="text-[#8A5A68] text-sm mt-2 leading-relaxed">
                  Replace this placeholder with your favorite memory together.
                </p>
              </div>
            </div>
          ))}
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
              <p className="text-[#8A5A68] italic mb-2">
                With Love,
              </p>

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
      <section className="px-6 pb-32">
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={handleSurprise}
            className="mt-10 bg-[#ff70ae] text-white px-8 py-4 rounded-full font-medium active:scale-95 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(255,112,174,0.3)]"
          >
            Unlock Surprise ✨
          </button>

          {showSurprise && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
              <div className="relative w-full max-w-md bg-white rounded-[32px] p-6 text-left shadow-[0_20px_80px_rgba(255,112,174,0.25)] animate-in zoom-in duration-500">
                <button
                  onClick={handleSurprise}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#ffeff6] flex items-center justify-center text-[#ff70ae] hover:scale-110 transition-transform"
                  aria-label="Close surprise popup"
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

              <div className="mt-6 bg-[#ffeff6] rounded-2xl p-4 border border-[#ffd6e7]">
                <p className="text-sm text-[#8A5A68]">
                  ✨ Hint: Don’t forget to save some space for dessert and gifts.
                </p>
              </div>
            </div>
            </div>
          )}
        </div>
      </section>

      {/* FLOATING MUSIC BUTTON */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#ff70ae] text-white backdrop-blur-xl flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,112,174,0.35)] active:scale-95 transition-all hover:scale-110 animate-pulse z-50"
      >
        <div className={`${isPlaying ? 'animate-spin' : ''}`}>
          {isPlaying ? '🎵' : '🎶'}
        </div>
      </button>
    </div>
  )
}
