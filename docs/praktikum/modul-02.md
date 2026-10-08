# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

**Nama/NIM** : Paulus Roberto Apolos Siagian/105224020
**Repositori** : https://github.com/pauluss-arch/Modul-1-pemweb-PaulusSiagian.git

> **Catatan bukti:** Dokumen ini disusun berdasarkan source code dan screenshot yang terdapat pada folder `docs/praktikum` pada project yang dikumpulkan. Screenshot responsif diberi nama `1280px.png` dan `360 px.png` secara terbalik terhadap ukuran viewport yang tertulis pada Device Toolbar, sehingga pada dokumen ini digunakan nama bukti berdasarkan **ukuran viewport aktual**.

## 1. Struktur Semantik

Halaman utama menggunakan beberapa elemen semantik pada komponen yang tersedia. Komponen `Section` menggunakan elemen `<section>` dengan `aria-labelledby` yang mengarah ke heading `<h2>`. Dengan demikian, setiap bagian mempunyai nama yang dapat dikenali pada accessibility tree.

Struktur heading pada halaman utama adalah:

- `<h1>`: **Hospital Data & Healthcare Catalog Directory**
- `<h2>`: **Healthcare Facilities Catalog**
- `<h2>`: **Emergency 24/7 & Urgent Care Guidelines**
- `<h3>`: **When to Visit a 24-Hour Emergency Center**
- `<h3>`: **Routine & Maternity Admissions**
- `<h2>`: **Directory Standards & Verification**

Komponen `Section` memiliki pola struktur:

```tsx
<section
  id={id}
  aria-labelledby={`${id}-heading`}
>
  <h2 id={`${id}-heading`}>
    {title}
  </h2>
  ...
</section>
```

Selain itu, komponen `HospitalCard` menggunakan `<article>` untuk setiap data rumah sakit. Form pencarian pada `HospitalList` menggunakan `<label htmlFor="hospital-search">` dan `<input id="hospital-search">`, sehingga label terhubung dengan kontrol formulir.

### Bukti accessibility tree

![Accessibility tree](accessibility-tree.png)

**Catatan:** screenshot di atas merupakan hasil pemeriksaan accessibility tree yang tersimpan di folder praktikum. Terlihat `RootWebArea`, heading utama, beberapa `region`, `searchbox`, `group`, dan elemen interaktif. Screenshot juga memperlihatkan tombol DevTools yang muncul pada lingkungan pengembangan.

### Catatan teknis

Pada source `app/page.tsx` yang dikumpulkan, halaman utama saat ini belum membungkus konten dengan `<main>`, dan komponen `SiteHeader` serta `SiteFooter` tersedia tetapi belum digunakan oleh `page.tsx`. Oleh karena itu, struktur tersebut masih perlu disesuaikan apabila targetnya harus memenuhi checkpoint modul secara penuh, yaitu memiliki satu `<main>`, landmark `header/nav/footer`, dan struktur landmark yang lengkap.

---

## 2. Tata Letak Responsif

Pengaturan responsif menggunakan pendekatan **mobile-first** Tailwind CSS. Beberapa kelas utama yang digunakan adalah:

| Bagian | Kelas | Alasan |
|---|---|---|
| Hero | `py-12 sm:py-16` | Padding dibuat lebih besar pada layar yang lebih lebar. |
| Container | `max-w-7xl px-4 sm:px-6 lg:px-8` | Membatasi lebar konten dan menjaga jarak dari tepi layar. |
| Katalog rumah sakit | `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3` | Satu kolom pada mobile, dua kolom pada layar medium, dan tiga kolom pada desktop. |
| Emergency/Urgent Care | `grid grid-cols-1 gap-6 md:grid-cols-2` | Dua informasi utama berdampingan mulai breakpoint medium. |
| Navigasi komponen | `flex items-center justify-between` | Logo dan navigasi disusun dalam satu baris. |
| Kontrol filter | `flex flex-wrap gap-2` | Tombol filter dapat berpindah baris ketika ruang tidak cukup. |

Pendekatan mobile-first berarti kelas tanpa breakpoint berlaku lebih dahulu untuk layar kecil, kemudian kelas seperti `sm:`, `md:`, dan `lg:` mengubah layout pada layar yang lebih besar.

### Tampilan 360 px

![Tampilan 360 px](screenshot-360px.png)

Pada ukuran 360 px, halaman menggunakan layout satu kolom. Elemen katalog dan kontrol pencarian tidak dipaksakan menjadi beberapa kolom sehingga konten tetap dapat ditampilkan pada layar sempit.

### Tampilan 768 px

![Tampilan 768 px](screenshot-768px.png)

Pada ukuran 768 px, breakpoint `md:` mulai berlaku. Bagian yang menggunakan `md:grid-cols-2` dapat ditampilkan dalam dua kolom.

### Tampilan 1280 px

![Tampilan 1280 px](screenshot-1280px.png)

Pada ukuran 1280 px, breakpoint `lg:` telah berlaku sehingga katalog rumah sakit dapat menggunakan tiga kolom melalui `lg:grid-cols-3`. Container `max-w-7xl` juga membatasi lebar konten agar tidak terlalu melebar.

### Catatan hasil pengujian responsif

Bukti screenshot yang tersedia menunjukkan halaman diuji pada tiga ukuran viewport: **360 px, 768 px, dan 1280 px**. Tidak ditemukan bukti screenshot yang menunjukkan adanya horizontal scroll pada ketiga ukuran tersebut.

---

## 3. Audit Aksesibilitas

### 3.1 Hasil Lighthouse

Bukti Lighthouse yang tersedia menunjukkan halaman utama memperoleh skor **94** pada kategori Accessibility.

| Halaman | Sebelum perbaikan | Sesudah/perolehan akhir | Keterangan |
|---|---:|---:|---|
| Halaman latihan `/latihan-audit` | Tidak tersedia pada project/screenshot | Tidak tersedia | Folder `app/latihan-audit` tidak terdapat pada source yang dikumpulkan. |
| Halaman utama `/` | Audit gagal dimuat pada salah satu percobaan | **94** | Screenshot `Audit 94.png` menunjukkan skor Accessibility 94. |

![Lighthouse Accessibility 94](lighthouse-94.png)

Pada screenshot tersebut terdapat peringatan dari Lighthouse mengenai kemungkinan pengaruh data `IndexedDB`, tetapi skor Accessibility yang terlihat adalah **94**.

### 3.2 Temuan audit dan perbaikan

Salah satu screenshot audit memperlihatkan audit dengan masalah kontras:

> **Background and foreground colors do not have a sufficient contrast ratio.**

Temuan tersebut berkaitan dengan rasio kontras antara warna latar dan warna teks. Pada source code, sebagian besar teks telah menggunakan warna yang relatif lebih gelap seperti `text-slate-600`, `text-slate-700`, dan `text-slate-900`, serta warna fokus yang lebih jelas seperti `focus-visible:ring-teal-600`.

Source code juga menerapkan beberapa praktik aksesibilitas:

- `<label>` terhubung dengan input menggunakan `htmlFor` dan `id`.
- Ikon SVG dekoratif menggunakan `aria-hidden="true"`.
- Tombol interaktif menggunakan elemen `<button>`.
- Tautan telepon menggunakan `<a href="tel:...">`.
- Kontrol filter menggunakan `aria-pressed`.
- Status hasil pencarian menggunakan `aria-live="polite"`.
- Elemen error menggunakan `role="alert"`.
- Elemen loading menggunakan `role="status"`.

### 3.3 Pemeriksaan manual dengan papan ketik

Source code memberikan focus state pada banyak kontrol interaktif menggunakan kelas:

```text
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-teal-600
focus-visible:ring-offset-2
```

Dengan demikian, ketika elemen menerima fokus melalui keyboard, posisi fokus dapat terlihat.

Pemeriksaan keyboard yang dilakukan/ditargetkan:

1. `Tab` digunakan untuk berpindah antar elemen interaktif.
2. `Shift + Tab` digunakan untuk kembali ke elemen sebelumnya.
3. Fokus visual diperiksa pada input, tombol filter, tombol reset, dan tautan telepon.
4. Tombol filter dapat dioperasikan menggunakan keyboard.
5. Kontrol input pencarian dapat menerima fokus dan masukan keyboard.

**Catatan bukti:** screenshot khusus hasil pengujian keyboard belum tersedia di folder `docs/praktikum`, sehingga bagian ini didasarkan pada implementasi focus state pada source code dan belum menjadi bukti visual terpisah.

---

## 4. Kendala dan Penyelesaian

### Kendala 1 — Hasil Lighthouse sempat gagal dimuat

Salah satu screenshot menunjukkan Lighthouse tidak dapat memuat halaman dengan pesan status **500** dan `NO_FCP`.

![Audit error](accessibility-audit-error.png)

**Penyelesaian:** audit dijalankan kembali hingga halaman berhasil dimuat. Hasil pengujian berikutnya menghasilkan skor Accessibility **94** pada halaman utama.

### Kendala 2 — Potensi masalah kontras

Lighthouse menunjukkan temuan:

`Background and foreground colors do not have a sufficient contrast ratio.`

**Penyelesaian:** penggunaan warna teks yang lebih gelap seperti `text-slate-600`, `text-slate-700`, dan `text-slate-900` diterapkan pada berbagai bagian halaman, sementara teks pada latar berwarna menggunakan kombinasi warna yang lebih kontras.

### Kendala 3 — Layout harus menyesuaikan beberapa ukuran layar

Layout katalog harus tetap nyaman pada mobile dan desktop.

**Penyelesaian:** digunakan pendekatan mobile-first dengan:

```text
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
```

Dengan konfigurasi tersebut, jumlah kolom bertambah ketika ukuran layar meningkat.

### Catatan tambahan

Pada source code yang dikumpulkan masih terdapat beberapa hal yang perlu diperbaiki untuk memenuhi seluruh checklist Modul 2 secara penuh:

- `app/layout.tsx` masih menggunakan `lang="en"`, bukan `lang="id"`.
- Metadata masih menggunakan `"Create Next App"` dan `"Generated by create next app"`.
- `app/page.tsx` belum menggunakan `<main>`.
- `SiteHeader` dan `SiteFooter` tersedia tetapi belum dirender pada halaman utama.
- Folder `app/latihan-audit` tidak terdapat pada source yang dikumpulkan.
- Bukti khusus accessibility tree dan pengujian keyboard perlu dilengkapi jika diminta sebagai bukti terpisah.

---

## 5. Catatan Pemanfaatan AI

**Alat:** ChatGPT (GPT-5.6 Luna)

**Bagian yang digunakan:** AI digunakan untuk membantu menyusun dan merapikan Dokumen Teknis Modul 2 berdasarkan source code dan bukti screenshot yang terdapat pada project.

**Perintah utama:** Meminta bantuan menyusun Dokumen Teknis Modul 2 berdasarkan kebutuhan pada bagian H, source code project, dan screenshot hasil pengujian pada folder `docs/praktikum`.

**Cara verifikasi:** Isi dokumen diverifikasi terhadap source code `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, komponen React pada folder `components`, serta screenshot responsif dan Lighthouse yang tersimpan pada `docs/praktikum`. Skor Lighthouse **94** diambil langsung dari screenshot yang tersedia, bukan dibuat berdasarkan perkiraan.

