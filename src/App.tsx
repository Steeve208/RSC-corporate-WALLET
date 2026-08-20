import { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { WalletPage } from './components/pages/WalletPage';
import { PaymentsPage } from './components/pages/PaymentsPage';
import { StakingPage } from './components/pages/StakingPage';
import { EducationPage } from './components/pages/EducationPage';
import { BusinessWalletPage } from './components/pages/BusinessWalletPage';
import { BusinessPaymentsPage } from './components/pages/BusinessPaymentsPage';
import { BusinessAPIPage } from './components/pages/BusinessAPIPage';
import { BusinessUseCasesPage } from './components/pages/BusinessUseCasesPage';
import { InstitutionalP2PPage } from './components/pages/InstitutionalP2PPage';
import { InstitutionalChainPage } from './components/pages/InstitutionalChainPage';
import { InstitutionalCorporatePage } from './components/pages/InstitutionalCorporatePage';
import { InstitutionalRSKPage } from './components/pages/InstitutionalRSKPage';
import { InstitutionalRealEstatePage } from './components/pages/InstitutionalRealEstatePage';
import { DevelopersDocsPage } from './components/pages/DevelopersDocsPage';
import { DevelopersChainPage } from './components/pages/DevelopersChainPage';
import { DevelopersAPIsPage } from './components/pages/DevelopersAPIsPage';
import { DevelopersTestnetPage } from './components/pages/DevelopersTestnetPage';
import { CompanyAboutPage } from './components/pages/CompanyAboutPage';
import { CompanySecurityPage } from './components/pages/CompanySecurityPage';
import { CompanyCareersPage } from './components/pages/CompanyCareersPage';
import { CompanyContactPage } from './components/pages/CompanyContactPage';
import { RemittancesPage } from './components/pages/RemittancesPage';
import { BusinessBillingPage } from './components/pages/BusinessBillingPage';
import { DevelopersRoadmapPage } from './components/pages/DevelopersRoadmapPage';
import { CompanyPressPage } from './components/pages/CompanyPressPage';
import { CompanySignDocsPage } from './components/pages/CompanySignDocsPage';
import { RscWebEmbeddedPage } from './components/pages/RscWebEmbeddedPage';
/* Theme, then site-wide editorial layer so inner pages match the landing */
import './styles/reeskova-theme.css';
import './styles/site-editorial.css';

type Page = 'landing' | 'wallet' | 'payments' | 'staking' | 'education' | 'remittances' | 'businessWallet' | 'businessPayments' | 'businessAPI' | 'businessUseCases' | 'businessBilling' | 'institutionalP2P' | 'institutionalChain' | 'institutionalCorporate' | 'institutionalRSK' | 'institutionalRealEstate' | 'rscWeb' | 'developersDocs' | 'developersChain' | 'developersAPIs' | 'developersTestnet' | 'developersRoadmap' | 'companyAbout' | 'companySecurity' | 'companyCareers' | 'companyContact' | 'companyPress' | 'companySignDocs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  // Expose navigation function globally for Navbar links
  useEffect(() => {
    (window as any).navigateToPage = (page: Page) => {
      setCurrentPage(page);
    };
  }, []);

  if (currentPage === 'wallet') {
    return <WalletPage />;
  }

  if (currentPage === 'payments') {
    return <PaymentsPage />;
  }

  if (currentPage === 'staking') {
    return <StakingPage />;
  }

  if (currentPage === 'education') {
    return <EducationPage />;
  }

  if (currentPage === 'remittances') {
    return <RemittancesPage />;
  }

  if (currentPage === 'businessWallet') {
    return <BusinessWalletPage />;
  }

  if (currentPage === 'businessPayments') {
    return <BusinessPaymentsPage />;
  }

  if (currentPage === 'businessAPI') {
    return <BusinessAPIPage />;
  }

  if (currentPage === 'businessUseCases') {
    return <BusinessUseCasesPage />;
  }

  if (currentPage === 'businessBilling') {
    return <BusinessBillingPage />;
  }

  if (currentPage === 'institutionalP2P') {
    return <InstitutionalP2PPage />;
  }

  if (currentPage === 'institutionalChain') {
    return <InstitutionalChainPage />;
  }

  if (currentPage === 'institutionalCorporate') {
    return <InstitutionalCorporatePage />;
  }

  if (currentPage === 'institutionalRSK') {
    return <InstitutionalRSKPage />;
  }

  if (currentPage === 'institutionalRealEstate') {
    return <InstitutionalRealEstatePage />;
  }

  if (currentPage === 'rscWeb') {
    return <RscWebEmbeddedPage />;
  }

  if (currentPage === 'developersDocs') {
    return <DevelopersDocsPage />;
  }

  if (currentPage === 'developersChain') {
    return <DevelopersChainPage />;
  }

  if (currentPage === 'developersAPIs') {
    return <DevelopersAPIsPage />;
  }

  if (currentPage === 'developersTestnet') {
    return <DevelopersTestnetPage />;
  }

  if (currentPage === 'developersRoadmap') {
    return <DevelopersRoadmapPage />;
  }

  if (currentPage === 'companyAbout') {
    return <CompanyAboutPage />;
  }

  if (currentPage === 'companySecurity') {
    return <CompanySecurityPage />;
  }

  if (currentPage === 'companyCareers') {
    return <CompanyCareersPage />;
  }

  if (currentPage === 'companyContact') {
    return <CompanyContactPage />;
  }

  if (currentPage === 'companyPress') {
    return <CompanyPressPage />;
  }

  if (currentPage === 'companySignDocs') {
    return <CompanySignDocsPage />;
  }

  return <LandingPage />;
}
