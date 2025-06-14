document.addEventListener('DOMContentLoaded', () => {
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    const openInvitationButton = document.getElementById('open-invitation');
    const backgroundMusic = document.getElementById('background-music');

    // --- Transisi Halaman Cover & Pemutaran Musik Otomatis ---
    openInvitationButton.addEventListener('click', () => {
        coverPage.classList.add('fade-out'); // Mulai animasi fade-out cover
        setTimeout(() => {
            coverPage.classList.add('hidden'); // Sembunyikan cover sepenuhnya setelah fade
            mainContent.classList.remove('hidden'); // Tampilkan konten utama
            mainContent.classList.add('visible'); // Mulai animasi fade-in konten utama

            // Coba putar musik
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Musik berhasil diputar otomatis.");
                }).catch(error => {
                    // Autoplay mungkin diblokir oleh browser (umum terjadi).
                    console.warn("Musik autoplay dicegah:", error);
                    // Kamu bisa menambahkan tombol "putar musik" di UI jika ini terjadi.
                });
            }
        }, 1000); // Durasi sesuai transisi CSS fade-out (1 detik)
    });

    // --- Animasi Muncul Saat Scroll ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const heroSection = document.getElementById('hero');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat di viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Jika ingin animasi hanya terjadi sekali saat terlihat, uncomment baris bawah:
                // observer.unobserve(entry.target);
            } else {
                // Jika ingin animasi berulang saat keluar/masuk viewport, uncomment baris bawah:
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Amati semua elemen yang perlu dianimasikan
    animateOnScrollElements.forEach(el => observer.observe(el));
    // Amati juga section hero untuk animasi fade-in awal
    observer.observe(heroSection);

    // --- Hitungan Mundur Hari Bahagia ---
    // Ganti tanggal dan waktu ini dengan tanggal pernikahanmu (YYYY-MM-DDTHH:MM:SS)
    const weddingDate = new Date('2025-12-25T08:00:00').getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Tampilkan di HTML dengan format dua digit
        document.getElementById('days').innerHTML = String(days).padStart(2, '0');
        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');

        // Jika hitungan mundur selesai
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('countdown-timer').innerHTML = "SELAMAT MENEMPUH HIDUP BARU!";
        }
    }, 1000); // Update setiap 1 detik

    // --- Tombol Salin Nomor Rekening ---
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.copyTarget; // Ambil ID target dari data-attribute
            const textToCopy = document.getElementById(targetId).innerText;

            // Menggunakan Clipboard API modern
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Nomor rekening berhasil disalin!');
                })
                .catch(err => {
                    console.error('Gagal menyalin teks: ', err);
                    alert('Gagal menyalin nomor rekening. Silakan salin manual.');
                });
        });
    });

    // --- Konfirmasi Kehadiran (RSVP) - Hanya Frontend ---
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form submit secara default (reload halaman)

        const name = document.getElementById('rsvp-name').value;
        const attendance = document.getElementById('rsvp-attendance').value;
        const guests = document.getElementById('rsvp-guests').value;

        // --- PENTING: BAGIAN INI HANYA UNTUK DEMO FRONTEND ---
        // Untuk menyimpan data secara permanen, kamu perlu mengirim data ini ke server (backend)
        // melalui AJAX (Fetch API atau XMLHttpRequest) dan menyimpannya di database.
        console.log(`RSVP Terkirim (Frontend):
            Nama: ${name}
            Kehadiran: ${attendance}
            Jumlah Tamu: ${guests}`);

        rsvpMessage.textContent = `Terima kasih, ${name}! Konfirmasi kehadiran Anda (${attendance}) telah diterima.`;
        rsvpMessage.style.color = '#28a745'; // Warna hijau untuk pesan sukses
        rsvpForm.reset(); // Kosongkan form
        setTimeout(() => {
            rsvpMessage.textContent = ''; // Hapus pesan setelah 5 detik
        }, 5000);
    });

    // --- Kirim Ucapan & Doa - Hanya Frontend ---
    const greetingForm = document.getElementById('greeting-form');
    const greetingSentMessage = document.getElementById('greeting-sent-message');
    const greetingsList = document.getElementById('greetings-list');

    greetingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('greeting-name').value;
        const message = document.getElementById('greeting-message').value;

        // --- PENTING: BAGIAN INI HANYA UNTUK DEMO FRONTEND ---
        // Sama seperti RSVP, untuk menyimpan dan menampilkan ucapan dari banyak tamu,
        // kamu perlu backend dan database. Ini hanya menambah ucapan ke daftar secara dinamis
        // di sisi klien (tidak akan tersimpan jika halaman di-refresh).
        console.log(`Ucapan Terkirim (Frontend):
            Nama: ${name}
            Ucapan: ${message}`);

        // Buat elemen baru untuk ucapan
        const newGreeting = document.createElement('div');
        newGreeting.classList.add('greeting-item');
        newGreeting.innerHTML = `
            <p class="greeting-name">${name}</p>
            <p class="greeting-text">${message}</p>
        `;
        greetingsList.prepend(newGreeting); // Tambahkan di paling atas daftar

        greetingSentMessage.textContent = `Terima kasih, ${name}! Ucapan Anda telah dikirim.`;
        greetingSentMessage.style.color = '#28a745';
        greetingForm.reset();
        setTimeout(() => {
            greetingSentMessage.textContent = '';
        }, 5000);
    });
});