// TAHSDIG Main JS v4
const norek = "7310119584";
const bank = "BSI";
const nama = "a.n. Yusufa Firzanah";
const waNumber = "6285731142534"; 
const waText = "Halo Admin TAHSDIG, saya sudah transfer Rp54.000 untuk akses.";

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

    if(document.getElementById('bank')) document.getElementById('bank').textContent = bank;
    if(document.getElementById('rek')) document.getElementById('rek').textContent = norek;
    if(document.getElementById('nama')) document.getElementById('nama').textContent = nama;
    
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
    document.querySelectorAll('.wa').forEach(el => el.href = waLink);

    const mbtns = document.querySelectorAll('.mbtn');
    const mpanels = document.querySelectorAll('.mpanel');
    
    mbtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-m');
            mbtns.forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
            e.target.classList.add('on'); e.target.setAttribute('aria-pressed', 'true');
            mpanels.forEach(p => p.hidden = true);
            document.getElementById(`m-${target}`).hidden = false;
        });
    });

    const copyBtn = document.getElementById('copyRek');
    if(copyBtn) {
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
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
