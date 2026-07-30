/**
 * CBN Tangerang - Interactive Logic & WhatsApp Sales Generator
 */

// Sales Marketing Configuration (Vemas - 085692992849)
const SALES_CONFIG = {
    whatsappNumber: "6285692992849", // Nomor WhatsApp Sales Vemas
    salesName: "Vemas",
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
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
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
    
    let recName = "Fiber 150";
    let recSpeed = "Speed Up To 300Mbps - Simetris 1:1";
    let recPrice = "Rp 259.740 /bulan (Sudah PPN 11%)";
    let recDesc = "Rekomendasi Terfavorit! Hemat & super cepat Up To 300Mbps untuk keluarga & WFH.";

    if (selectedActivity === 'business') {
        recName = "Fiber 300";
        recSpeed = "Speed Up To 500Mbps - Simetris 1:1";
        recPrice = "Rp 481.740 /bulan (Sudah PPN 11%)";
        recDesc = "Performa maksimal untuk operasional kantor, toko online, ruko, & bisnis perkantoran.";
    } else if (selectedActivity === 'gaming' || devices > 12) {
        recName = "Fiber 200";
        recSpeed = "Speed Up To 400Mbps - Ultra Low Latency";
        recPrice = "Rp 381.840 /bulan (Sudah PPN 11%)";
        recDesc = "Spesial untuk Heavy Gamers, Live Streamer, & download file besar tanpa nge-lag.";
    } else if (devices >= 7 || selectedActivity === 'streaming') {
        recName = "Fiber 100";
        recSpeed = "Speed Up To 200Mbps - Simetris 1:1";
        recPrice = "Rp 226.440 /bulan (Sudah PPN 11%)";
        recDesc = "Koneksi keluarga besar streaming 4K Ultra HD & WFH simultan tanpa hambat.";
    } else if (devices <= 2 && selectedActivity === 'basic') {
        recName = "Fiber 20";
        recSpeed = "Speed Up To 40Mbps - Simetris 1:1";
        recPrice = "Rp 193.140 /bulan (Sudah PPN 11%)";
        recDesc = "Paket paling ekonomis untuk penggunaan dasar 1-2 HP/Laptop.";
    }

    document.getElementById('recPackageName').innerText = recName;
    document.getElementById('recPackageSpeed').innerText = recSpeed;
    document.getElementById('recPackagePrice').innerText = recPrice;
    document.getElementById('recPackageDesc').innerText = recDesc;

    // Update WhatsApp link for recommendation button
    const recBtn = document.getElementById('recCalcBtn');
    if (recBtn) {
        const text = encodeURIComponent(`Halo Mas Vemas (Sales CBN Tangerang), dari hasil kalkulator website saya ingin daftar paket ${recName} (${recPrice})`);
        recBtn.href = `https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${text}`;
    }
}

// Form Handlers
function handleQuickFormSubmit(event) {
    event.preventDefault();
    const nama = document.getElementById('quickNama').value;
    const wa = document.getElementById('quickWA').value;
    const paket = document.getElementById('quickPaket').value;
    const alamat = document.getElementById('quickAlamat').value;

    const message = `Halo Mas Vemas (Sales CBN Tangerang), saya ingin pasang internet CBN Fiber:
- Nama: ${nama}
- No. WA: ${wa}
- Pilihan Paket: ${paket}
- Alamat: ${alamat}`;

    window.open(`https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleCoverageFormSubmit(event) {
    event.preventDefault();
    const nama = document.getElementById('covNama').value;
    const wa = document.getElementById('covWA').value;
    const kota = document.getElementById('covKota').value;
    const kec = document.getElementById('covKecamatan').value;
    const alamat = document.getElementById('covAlamat').value;

    const message = `Halo Mas Vemas (Sales CBN Tangerang), tolong cek ketersediaan jaringan / Tiang FAT CBN di lokasi saya:
- Nama Pemohon: ${nama}
- No. WA: ${wa}
- Kota/Kab: ${kota}
- Kecamatan: ${kec}
- Alamat Lengkap: ${alamat}`;

    window.open(`https://wa.me/${SALES_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// FAQ Accordion Toggle Function
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    if (!faqItem) return;
    
    const isActive = faqItem.classList.contains('active');
    
    // Close other open FAQ items for clean accordion behavior
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle clicked FAQ item
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}
