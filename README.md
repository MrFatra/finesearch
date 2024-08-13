# 🌐 Semantic Search Engine (FineSearch)

Sebuah mesin pencari semantik canggih yang dibangun menggunakan **Next.js 14**, **Vector Upstash**, **Drizzle**, **Postgres**, dan **OpenAI API**. Proyek ini memanfaatkan teknologi web modern untuk memberikan kemampuan pencarian yang cepat, akurat, dan cerdas.

## 🚀 Fitur

- **Pencarian Semantik**: Didukung oleh pencarian berbasis vektor menggunakan Upstash, dengan bantuan OpenAI API untuk meningkatkan akurasi semantik.
- **Frontend Modern**: Dibangun dengan Next.js 14 untuk performa dan skalabilitas optimal.
- **Lapisan Database**: Memanfaatkan Drizzle untuk query database yang aman dan Postgres sebagai database relasional yang andal.
- **Pembaruan Real-time**: Mengelola dan men-query dataset besar secara efisien dalam waktu nyata.

## 🛠️ Teknologi yang Digunakan

- **[Next.js 14](https://nextjs.org/)**: Framework React yang kuat dengan fitur seperti server-side rendering dan API routes.
- **[Vector Upstash](https://upstash.com/)**: Mesin pencari berbasis vektor yang mendukung pencarian semantik menggunakan embeddings.
- **[Drizzle](https://drizzle.team/)**: ORM ringan untuk Node.js yang menyediakan query SQL yang aman.
- **[Neon Tech + Postgres](https://www.postgresql.org/)**: Database cloud native relasional serverless.
- **[OpenAI API](https://platform.openai.com/)**: Digunakan untuk memperkaya indeks pencarian semantik pada Vector Upstash.

## 📦 Instalasi

1. **Kloning repository**:
   ```bash
   git clone https://github.com/MrFatra/finesearch.git
   cd finesearch
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Atur variabel lingkungan**:
   Buat file `.env` di root proyek.
   Lihat referensi pada `.env.example`

4. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.

## 📈 Penggunaan

- **Antarmuka Pencarian**: Masukkan kueri di bilah pencarian, dan mesin akan mengembalikan hasil yang terkait secara semantik dengan bantuan OpenAI API.

## 🛡️ Keamanan

- Pastikan untuk mengamankan variabel lingkungan dan kredensial database serta API key.
- Perbarui dependensi secara berkala untuk mencegah kerentanan.