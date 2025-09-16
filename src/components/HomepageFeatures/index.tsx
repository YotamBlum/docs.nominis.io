import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Quick Address Check',
    Svg: require('@site/static/img/address_Nominis.svg').default,
    description: (
      <>
        Get fast attribution and a risk score for up to 50 wallet addresses in a
        single request. Ideal for pre-screening and batch checks.
      </>
    ),
  },
  {
    title: 'Wallet Screening (Deep)',
    Svg: require('@site/static/img/wallet_with_Nominis_color.svg').default,
    description: (
      <>
        Full wallet risk analysis: balances, exposures (senders/receivers),
        asset distribution, intel, activity patterns, and geo signals across
        70+ blockchains.
      </>
    ),
  },
  {
    title: 'KYT (Transactions)',
    Svg: require('@site/static/img/KYT_Nominis.svg').default,
    description: (
      <>
        Transaction-level assessment for a specific tx hash with configurable
        depth. Surface proximity, risk categories, and behavioral indicators.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
