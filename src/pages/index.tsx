import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <img src={useBaseUrl('/img/Logo_new_all_white.png')} alt="Nominis" className={styles.heroLogo} />
        <p className={styles.heroSubtitle}>
          Intelligent crypto compliance. Faster insights, smarter decisions.
        </p>
        <div className={styles.heroCtas}>
          <Link className={clsx('button button--lg', styles.ctaPrimary)} to="/intro">
            Quick Start
          </Link>
        </div>
      </div>
    </header>


  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Nominis developer documentation — wallet & transaction screening APIs">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
