import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../contexts/I18nContext';
import '../../styles/rsc-web-embedded.css';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const RSC_WEB_FRAME_SRC = `${base}rsc-web/index.html`;

export function RscWebEmbeddedPage() {
  const { t } = useTranslation();

  const goBackToWallet = () => {
    const nav = (window as unknown as { navigateToPage?: (p: string) => void }).navigateToPage;
    if (nav) nav('landing');
  };

  return (
    <div className="rsc-web-embedded">
      <button
        type="button"
        className="rsc-web-embedded__back"
        onClick={goBackToWallet}
        aria-label={t('rscWeb.backToWallet')}
      >
        <ArrowLeft size={18} strokeWidth={2.25} aria-hidden />
        <span>{t('rscWeb.backToWallet')}</span>
      </button>
      <iframe
        title="RSC Chain"
        src={RSC_WEB_FRAME_SRC}
        className="rsc-web-embedded__frame"
      />
    </div>
  );
}
