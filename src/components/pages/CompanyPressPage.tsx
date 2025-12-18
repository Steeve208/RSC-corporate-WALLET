import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import { 
  Newspaper, 
  Download, 
  Mail,
  FileText,
  Image,
  ExternalLink,
  ArrowRight,
  Calendar,
  Megaphone,
  Globe,
  Users,
  CheckCircle,
  Send
} from 'lucide-react';
import '../../styles/company-press-page.css';

export function CompanyPressPage() {
  const { t } = useTranslation();

  return (
    <div className="company-press-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="company-press-hero">
        <div className="company-press-hero-container">
          <div className="company-press-hero-content">
            <div className="company-press-hero-icon">
              <Newspaper size={64} />
            </div>
            <h1 className="company-press-hero-title">{t('companyPress.hero.title')}</h1>
            <p className="company-press-hero-subtitle">{t('companyPress.hero.subtitle')}</p>
            <a href="#" className="company-press-hero-cta">
              {t('companyPress.hero.cta')}
              <Download className="company-press-hero-cta-icon" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Official Statements */}
      <section className="company-press-statements">
        <div className="company-press-container">
          <div className="company-press-section-header">
            <FileText className="company-press-section-icon" size={48} />
            <h2 className="company-press-section-title">{t('companyPress.statements.title')}</h2>
          </div>
          <div className="company-press-statements-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="company-press-statement-card">
                <div className="company-press-statement-date">
                  <Calendar size={16} />
                  <span>{t(`companyPress.statements.statement${item}.date`)}</span>
                </div>
                <h3 className="company-press-statement-title">{t(`companyPress.statements.statement${item}.title`)}</h3>
                <p className="company-press-statement-description">{t(`companyPress.statements.statement${item}.description`)}</p>
                <a href="#" className="company-press-statement-link">
                  {t('companyPress.readMore')}
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Launches */}
      <section className="company-press-news">
        <div className="company-press-container">
          <div className="company-press-section-header">
            <Megaphone className="company-press-section-icon" size={48} />
            <h2 className="company-press-section-title">{t('companyPress.news.title')}</h2>
          </div>
          <div className="company-press-news-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="company-press-news-card">
                <div className="company-press-news-image">
                  <Image size={32} />
                </div>
                <div className="company-press-news-content">
                  <div className="company-press-news-date">
                    <Calendar size={14} />
                    <span>{t(`companyPress.news.news${item}.date`)}</span>
                  </div>
                  <h3 className="company-press-news-title">{t(`companyPress.news.news${item}.title`)}</h3>
                  <p className="company-press-news-description">{t(`companyPress.news.news${item}.description`)}</p>
                  <a href="#" className="company-press-news-link">
                    {t('companyPress.readMore')}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="company-press-coverage">
        <div className="company-press-container">
          <div className="company-press-section-header">
            <Globe className="company-press-section-icon" size={48} />
            <h2 className="company-press-section-title">{t('companyPress.coverage.title')}</h2>
          </div>
          <div className="company-press-coverage-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="company-press-coverage-card">
                <div className="company-press-coverage-source">
                  {t(`companyPress.coverage.coverage${item}.source`)}
                </div>
                <h3 className="company-press-coverage-title">{t(`companyPress.coverage.coverage${item}.title`)}</h3>
                <div className="company-press-coverage-date">
                  <Calendar size={14} />
                  <span>{t(`companyPress.coverage.coverage${item}.date`)}</span>
                </div>
                <a href="#" target="_blank" rel="noopener noreferrer" className="company-press-coverage-link">
                  {t('companyPress.readArticle')}
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Announcements */}
      <section className="company-press-announcements">
        <div className="company-press-container">
          <div className="company-press-section-header">
            <Megaphone className="company-press-section-icon" size={48} />
            <h2 className="company-press-section-title">{t('companyPress.announcements.title')}</h2>
          </div>
          <div className="company-press-announcements-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="company-press-announcement-item">
                <div className="company-press-announcement-badge">
                  {t(`companyPress.announcements.announcement${item}.type`)}
                </div>
                <div className="company-press-announcement-content">
                  <h3 className="company-press-announcement-title">{t(`companyPress.announcements.announcement${item}.title`)}</h3>
                  <p className="company-press-announcement-description">{t(`companyPress.announcements.announcement${item}.description`)}</p>
                  <div className="company-press-announcement-meta">
                    <span className="company-press-announcement-date">
                      <Calendar size={14} />
                      {t(`companyPress.announcements.announcement${item}.date`)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="company-press-media-kit">
        <div className="company-press-container">
          <div className="company-press-section-header">
            <Download className="company-press-section-icon" size={48} />
            <h2 className="company-press-section-title">{t('companyPress.mediaKit.title')}</h2>
            <p className="company-press-section-description">{t('companyPress.mediaKit.description')}</p>
          </div>
          <div className="company-press-media-kit-grid">
            <div className="company-press-media-kit-card">
              <Image className="company-press-media-kit-icon" size={32} />
              <h3 className="company-press-media-kit-title">{t('companyPress.mediaKit.logos.title')}</h3>
              <p className="company-press-media-kit-description">{t('companyPress.mediaKit.logos.description')}</p>
              <a href="#" className="company-press-media-kit-link">
                {t('companyPress.download')}
                <Download size={16} />
              </a>
            </div>
            <div className="company-press-media-kit-card">
              <FileText className="company-press-media-kit-icon" size={32} />
              <h3 className="company-press-media-kit-title">{t('companyPress.mediaKit.guidelines.title')}</h3>
              <p className="company-press-media-kit-description">{t('companyPress.mediaKit.guidelines.description')}</p>
              <a href="#" className="company-press-media-kit-link">
                {t('companyPress.download')}
                <Download size={16} />
              </a>
            </div>
            <div className="company-press-media-kit-card">
              <Image className="company-press-media-kit-icon" size={32} />
              <h3 className="company-press-media-kit-title">{t('companyPress.mediaKit.screenshots.title')}</h3>
              <p className="company-press-media-kit-description">{t('companyPress.mediaKit.screenshots.description')}</p>
              <a href="#" className="company-press-media-kit-link">
                {t('companyPress.download')}
                <Download size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="company-press-contact">
        <div className="company-press-container">
          <div className="company-press-contact-content">
            <Mail className="company-press-contact-icon" size={64} />
            <h2 className="company-press-contact-title">{t('companyPress.contact.title')}</h2>
            <p className="company-press-contact-description">{t('companyPress.contact.description')}</p>
            <a href={`mailto:${t('companyPress.contact.email')}`} className="company-press-contact-email">
              {t('companyPress.contact.email')}
            </a>
          </div>
        </div>
      </section>

      {/* Media Form */}
      <section className="company-press-form-section">
        <div className="company-press-container">
          <div className="company-press-form-wrapper">
            <div className="company-press-form-header">
              <Send className="company-press-form-icon" size={48} />
              <h2 className="company-press-form-title">{t('companyPress.form.title')}</h2>
              <p className="company-press-form-description">{t('companyPress.form.description')}</p>
            </div>
            <form className="company-press-form">
              <div className="company-press-form-row">
                <div className="company-press-form-group">
                  <label htmlFor="name" className="company-press-form-label">
                    {t('companyPress.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="company-press-form-input"
                    required
                  />
                </div>
                <div className="company-press-form-group">
                  <label htmlFor="email" className="company-press-form-label">
                    {t('companyPress.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="company-press-form-input"
                    required
                  />
                </div>
              </div>
              <div className="company-press-form-group">
                <label htmlFor="media" className="company-press-form-label">
                  {t('companyPress.form.media')}
                </label>
                <input
                  type="text"
                  id="media"
                  name="media"
                  className="company-press-form-input"
                  required
                />
              </div>
              <div className="company-press-form-group">
                <label htmlFor="subject" className="company-press-form-label">
                  {t('companyPress.form.subject')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="company-press-form-select"
                  required
                >
                  <option value="">{t('companyPress.form.subjectPlaceholder')}</option>
                  <option value="interview">{t('companyPress.form.subjectOption1')}</option>
                  <option value="press-release">{t('companyPress.form.subjectOption2')}</option>
                  <option value="media-kit">{t('companyPress.form.subjectOption3')}</option>
                  <option value="other">{t('companyPress.form.subjectOption4')}</option>
                </select>
              </div>
              <div className="company-press-form-group">
                <label htmlFor="message" className="company-press-form-label">
                  {t('companyPress.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="company-press-form-textarea"
                  rows={6}
                  required
                ></textarea>
              </div>
              <button type="submit" className="company-press-form-submit">
                {t('companyPress.form.submit')}
                <Send className="company-press-form-submit-icon" size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

