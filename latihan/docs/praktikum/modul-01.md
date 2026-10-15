Dokumen Teknis Modul 1 – Lingkungan Pengembangan, Git, dan Lalu Lintas HTTP 

Nama : Paulus Roberto Apolos Siagian 

NIM : 105224020 

# 1. Lingkungan Pengembangan 

|Sistem Operasi|Windows 11|
|---|---|
|Node.js|26.7.0|
|Npm|12.1.0|
|Git|2.55.0.windows.3|
|Visual Studio Code|1.139.0|



2. Alur Kerja Git 

link pull request  

Luaran terminal diperoleh melalui sintaks git log --graph --oneline. Perintah tersebut berhasil memuat riwayat _commit_ aktif pada _branch_ master (f **b** 44b1), yaitu inisialisasi proyek Next.js dengan dukungan TypeScript dan Tailwind CSS. 

3. Pengamatan Lalu lintas HTTP 

|URL<br>t|Metode|Kode Status|Content-Type|Header lain yang di<br>amati|
|---|---|---|---|---|
|http://localhost:3000/<br>t|GET|200 OK|text/html|no-cache, must-<br>revalidate|
|http://localhost:3000/<br>halaman-tidak-ada|GET|404 Not<br>Found|text/html|no-cache, must-<br>revalidate|
|Satu berkas CSS atau<br>JS dari localhost<br>t|GET|304 Not<br>Modified|text/javascript|no-cache<br>i|
|http://github.com<br>(curl -I)<br>t|HEAD|301 Moved<br>Permanently|Tidak ada<br>respon|Location:<br>https://github.com/|
|https://<br>developer.mozilla.org|GET|304 Not<br>Modified|HTTPS|public, max-<br>age=3600|



<u>(dengan cache)</u> 

Ketika halaman dimuat tanpa mekanisme _cache_ , peramban ( _browser_ ) wajib meminta seluruh sumber daya langsung ke server. Server kemudian merespons dengan status kode 200 OK, menandakan bahwa sumber daya yang diminta berhasil ditemukan dan ditransmisikan secara lengkap. 

4. Kendala dan Penyelesaian untuk sampai sekarang tidak ada kendala untuk mengerjakan 

5. Catatan Pemanfaatan AI Alat, perintah utama, bagian yang digunakan, dan cara memverifikasinya. Tulis "Tidak menggunakan AI" apabila tidak menggunakan AI. 

