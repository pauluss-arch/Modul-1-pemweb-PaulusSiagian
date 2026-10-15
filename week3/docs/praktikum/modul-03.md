# Dokumen Teknis Modul 3 — TypeScript dan Komponen React

Nama/NIM :
Repositori :

## 1. Tipe Data Produk

Tipe utama produk didefinisikan pada `lib/tipe.ts`.

```ts
export type Kategori = "energi" | "lingkungan" | "kampus";

export interface Item {
  id: number;
  judul: string;
  kategori: Kategori;
  deskripsi: string;
  tersedia: boolean;
  gambar?: string;
}
```

`Kategori` menggunakan union type agar nilai kategori hanya dapat berupa `energi`, `lingkungan`, atau `kampus`. Hal ini membantu TypeScript mendeteksi nilai kategori yang tidak valid sejak proses pemeriksaan tipe.

`Item` menggunakan `interface` untuk mendefinisikan bentuk entitas produk. Properti `gambar` dibuat opsional karena tidak semua data produk harus memiliki gambar.

Data tiruan disimpan di `lib/data.ts` dan berisi enam item.

## 2. Struktur Komponen

Struktur komponen akhir:

```text
RootLayout (Server Component)
├── SiteHeader
├── halaman / (Server Component)
│   ├── Bagian
│   │   └── ItemTerbaru (Client Component)
│   ├── Bagian
│   └── Bagian
└── SiteFooter

halaman /katalog (Server Component)
└── Bagian
    └── DaftarItem (Client Component)
        └── KartuItem
```

| Komponen | Props dan tipe | Tempat digunakan |
|---|---|---|
| `SiteHeader` | `namaProduk: string`, `tautan: Tautan[]` | `app/layout.tsx` |
| `SiteFooter` | `namaProduk: string` | `app/layout.tsx` |
| `Bagian` | `id: string`, `judul: string`, `children: React.ReactNode` | halaman utama dan katalog |
| `KartuItem` | `item: Item` | `DaftarItem` |
| `DaftarItem` | `items: Item[]` | `app/katalog/page.tsx` |
| `ItemTerbaru` | tidak memiliki props | `app/page.tsx` |

`DaftarItem` diberi direktif `"use client"` karena menggunakan `useState` dan event handler. `ItemTerbaru` juga merupakan Client Component karena menggunakan `useState`, `useEffect`, dan Fetch API. Halaman utama, halaman katalog, `Bagian`, `KartuItem`, `SiteHeader`, dan `SiteFooter` tidak memerlukan state lokal atau event handler sehingga tetap dapat menjadi Server Component.

## 3. State dan Interaksi

Komponen `DaftarItem` memiliki dua state:

```ts
const [kataKunci, setKataKunci] = useState("");
const [filter, setFilter] = useState<Filter>("semua");
```

Alurnya adalah:

1. Pengguna mengetik pada input pencarian.
2. `onChange` memanggil `setKataKunci`.
3. Perubahan state menyebabkan `DaftarItem` melakukan render ulang.
4. Nilai `hasil` dihitung kembali berdasarkan kata kunci dan kategori.
5. Daftar kartu yang tampil berubah sesuai hasil penyaringan.

Filter kategori bekerja melalui `setFilter(k)`. Nilai `filter` dibandingkan dengan `item.kategori`.

Setiap item menggunakan `key={item.id}` agar React memiliki kunci yang stabil ketika daftar berubah akibat pencarian atau filter.

Pesan `Tidak ada item yang sesuai.` ditampilkan ketika `hasil.length === 0`. Jumlah hasil menggunakan `aria-live="polite"` sehingga perubahan jumlah dapat diumumkan oleh teknologi bantu tanpa memindahkan fokus pengguna.


Screenshot harus memperlihatkan komponen `DaftarItem`, props `items`, serta state `kataKunci` dan `filter`.

## 4. Pengambilan Data

Data tiruan juga tersedia pada `public/data/item.json`. Komponen `ItemTerbaru` mengambil data tersebut menggunakan:

```ts
const res = await fetch("/data/item.json");

if (!res.ok) {
  throw new Error(`HTTP ${res.status}`);
}

const data: Item[] = await res.json();
```

Pemeriksaan `res.ok` diperlukan karena `fetch()` tidak otomatis melempar error untuk status HTTP seperti 404 atau 500.

Komponen mempunyai tiga kondisi:

- `memuat`: menampilkan `Memuat data...`;
- `berhasil`: menampilkan tiga item pertama;
- `gagal`: menampilkan pesan `Data gagal dimuat. Muat ulang halaman.`.

### Bukti Network

![alt text](modul-03-network.png)

### Hasil Pengujian

| Kondisi | Hasil yang diharapkan | Hasil aktual |
|---|---|---|
| Memuat | `Memuat data...` | [isi setelah pengujian] |
| Berhasil | Tiga item tampil | [isi setelah pengujian] |
| Gagal | Pesan kegagalan tampil | [isi setelah pengujian] |

## 5. Verifikasi

Perintah pemeriksaan tipe:

```bash
npx tsc --noEmit
```

Hasil:

**[TEMPEL OUTPUT `npx tsc --noEmit` DI SINI]**

Perintah lint:

```bash
npm run lint
```

Hasil:

![alt text](modul-03-verifikasi.png)

Keduanya harus selesai tanpa galat sebelum perubahan dikumpulkan.

## 6. Kendala dan Penyelesaian

### 1. Penempatan `use client`

Komponen yang menggunakan `useState`, `useEffect`, atau event handler harus menjadi Client Component. Karena itu direktif `"use client"` ditempatkan pada `DaftarItem` dan `ItemTerbaru`, bukan pada seluruh aplikasi.

### 2. Validasi status Fetch API

`fetch()` dapat tetap menghasilkan response object ketika server memberikan status 404. Solusinya adalah memeriksa `res.ok` sebelum menggunakan data.

### 3. Key pada rendering daftar

Rendering daftar menggunakan `item.id` sebagai key. ID dipilih karena bersifat unik dan stabil, sedangkan indeks array dapat berubah ketika daftar difilter atau diurutkan.

### 4. Struktur `main` dan skip link

Elemen `main` ditempatkan pada masing-masing halaman agar tautan aksesibilitas `Lewati ke konten utama` mengarah ke konten halaman yang sebenarnya. Dengan demikian layout hanya bertanggung jawab atas header, footer, dan children halaman.

## 7. Catatan Pemanfaatan AI

Alat: ChatGPT.

Bagian yang digunakan:
- membantu meninjau struktur TypeScript dan komponen React;
- membantu menyesuaikan kode yang kemudian diverifikasi kembali melalui pemeriksaan tipe dan lint.

Cara verifikasi:
- membaca ulang setiap perubahan pada source code;
- menjalankan `npx tsc --noEmit`;
- menjalankan `npm run lint`;
- menguji pencarian, filter, Fetch API, dan kondisi gagal secara langsung pada aplikasi;
- memeriksa props dan state melalui React Developer Tools.

> Catatan: sesuaikan bagian ini dengan penggunaan AI yang benar-benar dilakukan selama pengerjaan. Modul mewajibkan pencatatan penggunaan AI.
