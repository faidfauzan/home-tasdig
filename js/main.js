// TAHSDIG Main JS v4
const norek = "7310119584";
const bank = "BSI";
const nama = "a.n. Yusufa Firzanah";
const waNumber = "6285731142534"; 

// Pesan WA yang berbeda untuk tiap paket
const waTextTasdig = "Halo Admin TASDIG, saya sudah transfer Rp54.000 untuk paket TASDIG Saja.";
const waTextPrivat = "Halo Admin TASDIG, saya sudah transfer Rp190.000 untuk paket Kelas Privat.";
const waTextKombinasi = "Halo Admin TASDIG, saya sudah transfer Rp235.000 untuk paket Kombinasi (TASDIG + Kelas Privat).";

function initTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '☀️';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Isi data bank ke semua section (karena sekarang pakai class, bukan ID)
    document.querySelectorAll('.bank').forEach(el => el.textContent = bank);
    document.querySelectorAll('.rek').forEach(el => el.textContent = norek);
    document.querySelectorAll('.nama').forEach(el => el.textContent = nama);
    // Backward compatibility untuk ID lama
    if(document.getElementById('bank')) document.getElementById('bank').textContent = bank;
    if(document.getElementById('rek')) document.getElementById('rek').textContent = norek;
    if(document.getElementById('nama')) document.getElementById('nama').textContent = nama;
    
    // Set link WA berbeda
    document.querySelectorAll('.wa').forEach(el => {
        if (el.classList.contains('wa-privat')) {
            el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waTextPrivat)}`;
        } else if (el.classList.contains('wa-kombinasi')) {
            el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waTextKombinasi)}`;
        } else {
            el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waTextTasdig)}`;
        }
    });

    // Logic Tab QRIS dan Tf
    const mbtns = document.querySelectorAll('.mbtn');
    mbtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-m');
            // Hanya hapus class 'on' pada tombol di dalam grup yang sama (section yang sama)
            const parentSection = e.target.closest('.pay');
            parentSection.querySelectorAll('.mbtn').forEach(b => { 
                b.classList.remove('on'); 
                b.setAttribute('aria-pressed', 'false'); 
            });
            
            e.target.classList.add('on'); 
            e.target.setAttribute('aria-pressed', 'true');
            
            // Sembunyikan semua panel di section ini, lalu tampilkan yang diklik
            parentSection.querySelectorAll('.mpanel').forEach(p => p.hidden = true);
            document.getElementById(`m-${target}`).hidden = false;
        });
    });

    // Logic tombol Salin Rekening
    document.querySelectorAll('.copy').forEach(copyBtn => {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(norek).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Berhasil Disalin!';
                copyBtn.style.background = '#4ade80';
                copyBtn.style.color = '#fff';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            });
        });
    });

    // Scroll Smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // LOGIKA MENAMPILKAN SECTION PEMBAYARAN YANG BENAR
            if (this.classList.contains('btn-paket')) {
                // Sembunyikan semua section pembayaran
                document.getElementById('beli').style.display = 'none';
                document.getElementById('beli-privat').style.display = 'none';
                document.getElementById('beli-kombinasi').style.display = 'none';
                
                // Cari tahu mana yang harus ditampilkan
                let sectionToShow = 'beli'; // Default paket 1
                if (this.classList.contains('btn-brown')) {
                    sectionToShow = 'beli-privat';
                } else if (this.classList.contains('btn-gold')) {
                    sectionToShow = 'beli-kombinasi';
                }
                
                // Tampilkan section yang sesuai
                const targetSection = document.getElementById(sectionToShow);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Scroll biasa untuk tombol lain (misal dari header ke '#beli')
                const target = document.querySelector(targetId);
                if(target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});