import {
  Title1,
  Title2,
  Text,
  Button,
  Card,
  CardHeader,
  Link,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { RocketFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: tokens.colorBrandForeground1,
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    width: '100%',
  },
  card: {
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

export function HomePage() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <RocketFilled fontSize={48} />
        <Title1>Fluent prototype kit</Title1>
      </div>

      <Text size={500} align="center">
        A rapid prototyping toolkit for Microsoft's {' '}
        <Link href="https://fluent2.microsoft.design/" target="_blank">
          Fluent 2
        </Link>{' '}
        design system using {' '}
        <Link href="https://react.fluentui.dev/" target="_blank">
          Fluent UI React v9.
        </Link>
      </Text>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Title2 as="h3">Session management</Title2>}
            description={<Text>Persist data across pages and browser sessions</Text>}
          />
          <div className={styles.cardContent}>
            <Text>
              • Data stored in server-side sessions
              <br />
              • Survives page refreshes
              <br />
              • Works across multiple pages
              <br />• Simple React hook API
            </Text>
            <Button
              appearance="primary"
              icon={<ArrowRightFilled />}
              iconPosition="after"
              onClick={() => navigate('/session-demo')}
            >
              Try session demo
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Title2 as="h3">Multi-step forms</Title2>}
            description={<Text>Build complex user journeys with multiple steps</Text>}
          />
          <div className={styles.cardContent}>
            <Text>
              • Step-by-step form flows
              <br />
              • Data preserved between steps
              <br />
              • Progress tracking
              <br />• Review and confirmation
            </Text>
            <Button
              appearance="primary"
              icon={<ArrowRightFilled />}
              iconPosition="after"
              onClick={() => navigate('/form')}
            >
              Start form journey
            </Button>
          </div>
        </Card>
      </div>

      <Card style={{ width: '100%' }}>
        <div className={styles.cardContent}>
          <Title2>Phase 1.7 complete ✅</Title2>
          <Text>
            <strong>Multi-step form with enhanced UX</strong> - Session management, keyboard shortcuts, auto-focus, data persistence, and simplified Microsoft Writing Style
          </Text>
          <Text size={300}>
            This prototype demonstrates a complete registration flow with session-based data storage,
            accessible form patterns, and clean UI following Fluent Design principles.
          </Text>
          <Button
            appearance="secondary"
            icon={<ArrowRightFilled />}
            iconPosition="after"
            onClick={() => window.open('https://github.com/tomresing/fluent-prototype-kit', '_blank')}
          >
            View on GitHub
          </Button>
        </div>
      </Card>
    </div>
  );
}
