// src/components/services/ServiceCard.tsx
'use client'

import React from 'react';
import './service-card.css';

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="card">
      <div className="card__border"></div>
      <div className="card_title__container">
        <span className="card_title">{service.title}</span>
        <p className="card_paragraph">{service.description}</p>
      </div>
      <hr className="line" />
      <ul className="card__list">
        {service.features.map((feature, index) => (
          <li key={index} className="card__list_item">
            <span className="check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="check_svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="list_text">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      title: "Web Tasarım",
      description: "Modern ve etkileyici web tasarımları ile markanızı öne çıkarın",
      features: [
        "Responsive Tasarım",
        "Modern UI/UX",
        "SEO Optimizasyonu",
        "Hızlı Yükleme",
        "Cross-Browser Uyumluluk"
      ]
    },
    {
      title: "E-Ticaret Çözümleri",
      description: "Online satış sisteminizi profesyonel altyapı ile kurun",
      features: [
        "Güvenli Ödeme Sistemi",
        "Stok Yönetimi",
        "Mobil Uyumlu",
        "Çoklu Dil Desteği",
        "Analitik Raporlama"
      ]
    },
    {
      title: "Dijital Pazarlama",
      description: "Hedef kitlenize etkili bir şekilde ulaşın",
      features: [
        "SEO Stratejileri",
        "Sosyal Medya Yönetimi",
        "İçerik Pazarlama",
        "Email Marketing",
        "Performans Analizi"
      ]
    }
  ];

  return (
    <section className="services-section">
      <h1 className="section-title">Hizmetlerimiz</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;