
import { LandingPageContent } from './types';

export const INITIAL_CONTENT: LandingPageContent = {
  adminConfig: {
    password: "admin123",
    showAdminButton: true,
  },
  branding: {
    logoUrl: "", // Empty will use default icon
    faviconUrl: "",
    brandName: "Heppimobi",
    accentColor: "#E32636",
  },
  hero: {
    headline: "Lampu Mobil Bening, Gak Pakai Ribet",
    subheadline: "Heppimobi adalah spesialis restorasi lampu mobil No.1. Kembalikan kejernihan lampu mobil Anda dengan teknologi Nano Burn & Ceramic Coating.",
    ctaText: "Booking Sekarang",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    visible: true,
  },
  pricing: {
    sectionTitle: "Pilih Paket Kejernihan",
    sectionSubtitle: "Dapatkan visibilitas maksimal dengan perlindungan jangka panjang.",
    visible: true,
    packages: [
      {
        id: "1",
        name: "EXPRESS",
        stepPoles: 5,
        waktuPengerjaan: "2 JAM",
        ketahanan: "6 BULAN",
        proteksi: "Sealant",
        garansi: "-",
        retakRambut: false,
        harga: 249000,
        isBestSeller: false,
        visible: true,
      },
      {
        id: "2",
        name: "NANO BURN",
        stepPoles: 8,
        waktuPengerjaan: "4 JAM",
        ketahanan: "2 TAHUN",
        proteksi: "Import",
        garansi: "6 BULAN",
        retakRambut: true,
        harga: 395000,
        isBestSeller: false,
        visible: true,
      },
      {
        id: "3",
        name: "NANO CERAMIC",
        stepPoles: 10,
        waktuPengerjaan: "6 JAM",
        ketahanan: "4 TAHUN",
        proteksi: "Ceramic Coat",
        garansi: "1 TAHUN",
        retakRambut: true,
        harga: 495000,
        isBestSeller: true,
        visible: true,
      }
    ]
  },
  features: {
    sectionTitle: "Kenapa Memilih Kami?",
    visible: true,
    items: [
      {
        id: "f1",
        title: "Tanpa Bongkar",
        description: "Keamanan orisinalitas seal lampu terjamin 100%.",
        icon: "Shield"
      },
      {
        id: "f2",
        title: "Home Service",
        description: "Kami datang ke rumah Anda. Hemat waktu dan tenaga.",
        icon: "Zap"
      },
      {
        id: "f3",
        title: "Hasil Permanen",
        description: "Teknologi Nano Burn memastikan kejernihan tahan lama.",
        icon: "Smile"
      }
    ]
  },
  process: {
    sectionTitle: "Work Process",
    visible: true,
    steps: [
      { id: "s1", number: 1, title: "Deep Cleaning", description: "Pembersihan total residu kotoran." },
      { id: "s2", number: 2, title: "Multi-Sand", description: "Proses amplas berjenjang 5-10 tahap." },
      { id: "s3", number: 3, title: "Nano Coating", description: "Penguapan / Pelapisan Ceramic." },
      { id: "s4", number: 4, title: "Inspection", description: "Pengecekan kualitas akhir." }
    ]
  },
  cta: {
    headline: "Siap Tampil Beda?",
    subheadline: "Hubungi kami hari ini dan dapatkan slot jadwal tercepat.",
    buttonText: "Contact us via WhatsApp",
    whatsappNumber: "628123456789",
    visible: true,
  },
  footer: {
    tagline: "HEPPIMOBI, YOU HAPPY",
    contact: "0812-3456-7890",
    address: "Jabodetabek Area",
    visible: true,
  },
  analytics: {
    totalVisits: 0,
    uniqueVisits: 0,
    dailyStats: {},
    lastReset: new Date().toISOString()
  }
};
