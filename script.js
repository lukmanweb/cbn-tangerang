/**
 * CBN Tangerang - Interactive Logic & WhatsApp Sales Generator
 */

// Sales Marketing Configuration (Dapat disesuaikan)
const SALES_CONFIG = {
    whatsappNumber: "6285711146723", // Nomor WhatsApp Sales Marketing CBN Tangerang
    salesName: "Sales Marketing CBN Tangerang",
    area: "Tangerang & Sekitarnya"
};

// =============================================
// THEME TOGGLE (Light / Dark Mode)
// =============================================
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    const isDark = body.classList.toggle('dark-mode');

    if (isDark) {
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('cbn-theme', 'dark');
    } else {
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('cbn-theme', 'light');
    }
}

function applyStoredTheme() {
    const savedTheme = localStorage.getItem('cbn-theme');
    const icon = document.getElementById('themeIcon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        if (icon) icon.className = 'fa-solid fa-moon';
    }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function() {
    applyStoredTheme();
    initMobileNav();
    updateCalculator();
    initSmoothScroll();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const toggleBtn = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            const icon = toggleBtn.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }
}

// Smooth Scrolling for Nav Links
function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-link, a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile nav if open
                    const navMenu = document.getElementById("navMenu");
                    const toggleBtn = document.getElementById("mobileToggle");
                    if (navMenu && navMenu.classList.contains("active")) {
                        navMenu.classList.remove("active");
                        if (toggleBtn) toggleBtn.querySelector("i").className = "fa-solid fa-bars";
                    }

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Product Catalog Filter Tabs
function filterProducts(category) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Set active tab
    event.currentTarget.classList.add('active');
    
    const cards = document.querySelectorAll('.price-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Interactive Package Calculator
let selectedActivity = 'basic';

function selectActivity(element, activityType) {
    document.querySelectorAll('.activity-chip').forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');
    selectedActivity = activityType;
    updateCalculator();
}

function updateCalculator() {
    const rangeInput = document.getElementById('deviceRange');
    const deviceDisplay = document.getElementById('deviceDisplay');
    
    if (!rangeInput || !deviceDisplay) return;
    
    const devices = parseInt(rangeInput.value);
    deviceDisplay.innerHTML = `<strong>${devices} Perangkat Terhubung</strong>`;
    
    let recName = "CBN Fiber Home 100";
    let recSpeed = "Kecepatan Up to 100 Mbps (Simetris 1:1)";
    let recPrice = "Rp 299.000 /bulan";
    let recDesc = "Ideal untuk 1-5 perangkat, browsing cepat, dan streaming Full HD.";

    if (selectedActivity === 'business') {
        recName = "CBN Enterprise Premier / DirectNet";
        recSpeed = "Bandwidth Dedicated 1:1 & SLA 99.8%";
        recPrice = "Hubungi Sales (Custom Price)";
        recDesc = "Rekomendasi terbaik untuk operasional kantor, cafe, ruko, dan industri pabrik di Tangerang.";
    } else if (selectedActivity === 'gaming' || devices > 12) {
        recName = "CBN Fiber Pro 500";
        recSpeed = "Kecepatan Up to 500 Mbps (Ultra Low Ping)";
        recPrice = "Rp 799.000 /bulan";
        recDesc = "Solusi maksimal bagi Gamers, Live Streamer 4K, & heavy downloader tanpa lag.";
    } else if (devices >= 6 || selectedActivity === 'streaming') {
        recName = "CBN Fiber Home 200";
        recSpeed = "Kecepatan Up to 200 Mbps (Simetris 1:1)";
        recPrice = "Rp 399.000 /bulan";
        recDesc = "Paket terfavorit keluarga modern Tangerang. Bebas hambatan saat streaming 4K & WFH simultan.";
    }

    document.getElementById('recPackageName').innerText = recName;
    document.getElementById('recPackageSpeed').innerText = recSpeed;
    document.getElementById('recPackagePrice').innerText = recPrice;
    document.getElementById('recPackageDesc').innerText = recDesc;

    // Update WhatsApp link for recommendation button
    const message = encodeURIComponent(
        `Halo Sales CBN Tangerang,\nSaya menggunakan Kalkulator Paket di website:\n- Perangkat: ${devices} Devices\n- Aktivitas: ${selectedActivity}\n- Rekomendasi: ${recName} (${recPrice})\n\nMohon info ketersediaan jaringan & cara daftarnya!`
    );
    const waBtn = document.getElementById('recWhatsappBtn');
    if (waBtn) {
        waBtn.href = `https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${message}`;
    }
}

// Hero Quick Lead Form Handler (Direct WA)
function handleHeroFormSubmit(e) {
    e.preventDefault();
    const nama = document.getElementById('heroNama').value.trim();
    const wa = document.getElementById('heroWA').value.trim();
    const wilayah = document.getElementById('heroWilayah').value;
    const alamat = document.getElementById('heroAlamat').value.trim();

    if (!nama || !wa || !wilayah || !alamat) {
        alert("Mohon lengkapi seluruh formulir pendaftaran!");
        return;
    }

    const messageText = `Halo ${SALES_CONFIG.salesName},\nSaya ingin cek jangkauan jaringan CBN & klaim promo pemasangan:\n\n📌 *DATA PEMOHON:*` +
        `\n• Nama: ${nama}` +
        `\n• No. WA: ${wa}` +
        `\n• Area/Kecamatan: ${wilayah}` +
        `\n• Alamat Lengkap: ${alamat}` +
        `\n\nMohon dicek tiang FAT terdekat & infokan promo yang berlaku. Terima kasih!`;

    const waUrl = `https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
}

// Coverage Form Handler (Direct WA)
function handleCoverageFormSubmit(e) {
    e.preventDefault();
    const nama = document.getElementById('covNama').value.trim();
    const wa = document.getElementById('covWA').value.trim();
    const kota = document.getElementById('covKota').value;
    const kecamatan = document.getElementById('covKecamatan').value.trim();
    const alamat = document.getElementById('covAlamat').value.trim();

    const messageText = `Halo ${SALES_CONFIG.salesName},\nMohon bantu cek ketersediaan tiang FAT CBN di lokasi berikut:\n\n📍 *LOKASI PENGECEKAN:*` +
        `\n• Nama: ${nama}` +
        `\n• No. WA: ${wa}` +
        `\n• Kota/Kab: ${kota}` +
        `\n• Kecamatan: ${kecamatan}` +
        `\n• Alamat / Cluster: ${alamat}` +
        `\n\nSaya menunggu kabar ketersediaan port & jadwal survey teknisi!`;

    const waUrl = `https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
}

// FAQ Accordion Toggle
function toggleFaq(buttonElement) {
    const faqItem = buttonElement.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // If it wasn't active, open it
    if (!isActive) {
        faqItem.classList.add('active');
    }
}
