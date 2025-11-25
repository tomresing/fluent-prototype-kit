import { makeStyles, tokens } from '@fluentui/react-components';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const styles = useStyles();

  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
