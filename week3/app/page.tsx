// app/page.tsx
import Bagian from "@/components/Bagian";
import Kontak from "@/components/Kontak";
import Link from "next/link";

export default function Page() {
  return (
    <main id="konten" className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero / Banner */}
      <section className="rounded-lg bg-gray-100 p-8 text-center">
        <h1 className="text-3xl font-bold">Selamat Datang di Katalog Produk</h1>
        <p className="mt-2 text-gray-600">
          Temukan berbagai informasi dan layanan terbaru kami.
        </p>
        <div className="mt-4">
          <Link
            href="/katalog"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Lihat Katalog
          </Link>
        </div>
      </section>

      {/* Section Fitur menggunakan Bagian */}
      <Bagian id="fitur" judul="Fitur Unggulan">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border p-4">
            <h3 className="font-semibold">Responsif</h3>
            <p className="mt-1 text-sm text-gray-600">
              Tampilan menyesuaikan berbagai ukuran layar.
            </p>
          </div>
          <div className="rounded border p-4">
            <h3 className="font-semibold">Cepat & Aksesibel</h3>
            <p className="mt-1 text-sm text-gray-600">
              Dioptimalkan untuk performa dan standar aksesibilitas.
            </p>
          </div>
          <div className="rounded border p-4">
            <h3 className="font-semibold">Pencarian Mudah</h3>
            <p className="mt-1 text-sm text-gray-600">
              Filter dan cari informasi dengan cepat.
            </p>
          </div>
        </div>
      </Bagian>

      {/* Section Kontak menggunakan Bagian */}
      <Bagian id="kontak" judul="Hubungi Kami">
        <Kontak />
      </Bagian>
    </main>
  );
}
