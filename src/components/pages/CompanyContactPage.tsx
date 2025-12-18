import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Mail, 
  Send,
  Building2,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import '../../styles/company-contact-page.css';

export function CompanyContactPage() {
  const { t } = useTranslation();

  return (
    <div className="company-contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="company-contact-hero">
        <div className="company-contact-hero-container">
          <div className="company-contact-hero-content">
            <div className="company-contact-hero-icon">
              <MessageSquare size={64} />
            </div>
            <h1 className="company-contact-hero-title">{t('companyContact.hero.title')}</h1>
            <p className="company-contact-hero-subtitle">{t('companyContact.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="company-contact-form-section">
        <div className="company-contact-container">
          <div className="company-contact-form-wrapper">
            <div className="company-contact-form-header">
              <Send className="company-contact-form-icon" size={48} />
              <h2 className="company-contact-form-title">{t('companyContact.form.title')}</h2>
              <p className="company-contact-form-description">{t('companyContact.form.description')}</p>
            </div>
            <form className="company-contact-form">
              <div className="company-contact-form-row">
                <div className="company-contact-form-group">
                  <label htmlFor="name" className="company-contact-form-label">
                    {t('companyContact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="company-contact-form-input"
                    required
                  />
                </div>
                <div className="company-contact-form-group">
                  <label htmlFor="email" className="company-contact-form-label">
                    {t('companyContact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="company-contact-form-input"
                    required
                  />
                </div>
              </div>
              <div className="company-contact-form-group">
                <label htmlFor="company" className="company-contact-form-label">
                  {t('companyContact.form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="company-contact-form-input"
                />
              </div>
              <div className="company-contact-form-group">
                <label htmlFor="subject" className="company-contact-form-label">
                  {t('companyContact.form.subject')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="company-contact-form-select"
                  required
                >
                  <option value="">{t('companyContact.form.subjectPlaceholder')}</option>
                  <option value="partnership">{t('companyContact.form.subjectOption1')}</option>
                  <option value="business">{t('companyContact.form.subjectOption2')}</option>
                  <option value="technical">{t('companyContact.form.subjectOption3')}</option>
                  <option value="other">{t('companyContact.form.subjectOption4')}</option>
                </select>
              </div>
              <div className="company-contact-form-group">
                <label htmlFor="message" className="company-contact-form-label">
                  {t('companyContact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="company-contact-form-textarea"
                  rows={6}
                  required
                ></textarea>
              </div>
              <button type="submit" className="company-contact-form-submit">
                {t('companyContact.form.submit')}
                <Send className="company-contact-form-submit-icon" size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Institutional Email */}
      <section className="company-contact-email">
        <div className="company-contact-container">
          <div className="company-contact-email-content">
            <Building2 className="company-contact-email-icon" size={64} />
            <h2 className="company-contact-email-title">{t('companyContact.email.title')}</h2>
            <p className="company-contact-email-description">{t('companyContact.email.description')}</p>
            <div className="company-contact-email-addresses">
              <a href={`mailto:${t('companyContact.email.address1.email')}`} className="company-contact-email-link">
                <Mail className="company-contact-email-link-icon" size={20} />
                <div className="company-contact-email-link-content">
                  <span className="company-contact-email-link-label">{t('companyContact.email.address1.label')}</span>
                  <span className="company-contact-email-link-address">{t('companyContact.email.address1.email')}</span>
                </div>
                <ArrowRight className="company-contact-email-link-arrow" size={20} />
              </a>
              <a href={`mailto:${t('companyContact.email.address2.email')}`} className="company-contact-email-link">
                <Mail className="company-contact-email-link-icon" size={20} />
                <div className="company-contact-email-link-content">
                  <span className="company-contact-email-link-label">{t('companyContact.email.address2.label')}</span>
                  <span className="company-contact-email-link-address">{t('companyContact.email.address2.email')}</span>
                </div>
                <ArrowRight className="company-contact-email-link-arrow" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

