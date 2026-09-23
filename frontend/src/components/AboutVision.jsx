
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

export default function AboutVision() {
  const sectionRef = useScrollReveal()

  return (
    <section className="w-full py-space-xl bg-ivory-2" id="tentang-kami" ref={sectionRef}>
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md text-emerald-leaf tracking-widest uppercase font-semibold">
            Tafaqquh Fiddin
          </span>
          <h2 className="font-heading font-bold text-headline-lg text-emerald-deep mt-space-xs">
            Menyemai Adab, Merajut Prestasi Sejak Usia Dini
          </h2>
          <div className="w-16 h-1 bg-emerald-leaf rounded-full mx-auto mt-space-sm"></div>
        </div>

        <div className="bg-white rounded-2xl p-space-lg lg:p-space-xl shadow-md border border-border/60 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left Col: Photo of Principal */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
                <div className="relative w-full h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-lg border-2 border-border">
                  <img
                    alt="Nenden Renny SN - Kepala Madrasah MI Roudotutta'lim"
                    className="w-full h-full object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1X3aGjtRWb6zzSwS_Wg2uxNVpHInvNwAIRlJVGbK44wxJTitoMHP1DcMvmksS4m36Fb0FQ68h1-vF3Zenu5Zl7nAS9nzR62zK62Yg6KrtrRAD2aK_aRw8SmWy8ZTMZzlWD8H_KW7QDFEc2sCdIcbs6VY6Du2GdKtMWCkQKocapsrc1cqxxCNYjgwa1UJntV7fVhiaYbKC4NfBMjfTxiazlFsWjVhgoIt-S_bOLVwdym74DENmywMKal9AQ1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-leaf text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>
              <div className="mt-space-md w-full text-center sm:text-left">
                <h3 className="font-heading font-bold text-headline-sm text-emerald-deep leading-snug">
                  Nenden Renny SN, S.Pd.
                </h3>
                <p className="font-label-lg text-label-lg text-emerald-leaf font-semibold mt-0.5">
                  Kepala Madrasah MI Roudotutta'lim
                </p>
                <p className="font-body-sm text-body-sm text-ink-soft mt-0.5">
                  Masa Khidmah 2021 – Sekarang
                </p>
              </div>
            </div>

            {/* Right Col: Welcome Narrative & Vision */}
            <div className="lg:col-span-7 flex flex-col gap-space-md lg:pl-space-md">
              <h3 className="font-heading font-semibold text-headline-md text-emerald-deep leading-snug">
                "Mendidik dengan Hati, Menuntun Fitrah Menuju Pribadi Qur'ani dan Berprestasi"
              </h3>
              <div className="border-l-2 border-emerald-leaf/40 pl-space-md bg-ivory-2/70 p-space-sm rounded-r-xl">
                <p className="font-body-md text-body-md text-ink-soft italic leading-relaxed">
                  "Bismillahirrohmanirrohim. Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur ke hadirat Allah SWT atas segala limpahan karunia dan amanah membimbing generasi tunas bangsa."
                </p>
              </div>
              <div className="space-y-space-sm text-ink-soft font-body-md text-body-md leading-relaxed">
                <p>
                  Selamat datang kami haturkan kepada bapak, ibu, dan seluruh calon wali santri di lingkungan madrasah tercinta. Kami memandang setiap amanah putra-putri Anda bukan sekadar peserta didik, melainkan titipan suci Ilahi yang harus disemai dengan ilmu yang bermanfaat, pembiasaan akhlakul karimah, serta teladan penuh cinta kasih.
                </p>
                <p>
                  Bersama para asatidz dan pendidik yang ikhlas, kami berikhtiar menghadirkan atmosfer pembelajaran yang aman, islami, dan berwawasan global. Sinergi yang erat antara pihak sekolah dan orang tua adalah kunci utama mengantarkan ananda tumbuh menjadi insan muttaqin yang mandiri, cerdas bernalar, dan berakhlak mulia.
                </p>
              </div>
              <div className="pt-space-md border-t border-border/60 flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-emerald-leaf text-[24px]">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-emerald-deep font-semibold">Akreditasi A (Unggul)</span>
                    <span className="font-body-sm text-[0.8rem] text-ink-soft">SK Kemenag &amp; Badan Akreditasi Nasional</span>
                  </div>
                </div>
                <Link
                  className="font-label-lg text-label-lg text-emerald-leaf hover:text-emerald-deep transition-colors inline-flex items-center gap-1 font-semibold group"
                  to="/visi-misi"
                >
                  <span>Kenali Profil Lengkap</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
