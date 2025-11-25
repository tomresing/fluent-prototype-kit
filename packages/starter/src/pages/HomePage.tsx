import {
  Title1,
  Title2,
  Text,
  Button,
  Card,
  CardHeader,
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
        <Title1>Fluent Prototype Kit</Title1>
      </div>

      <Text size={500} align="center">
        A rapid prototyping toolkit for Microsoft Fluent Design System using Fluent UI React v9
      </Text>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Title2 as="h3">Session Management</Title2>}
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
              Try Session Demo
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Title2 as="h3">Multi-Page Forms</Title2>}
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
              Start Form Journey
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Title2 as="h3">50+ Components</Title2>}
            description={<Text>Production-ready Fluent UI React v9 components</Text>}
          />
          <div className={styles.cardContent}>
            <Text>
              • Buttons, inputs, dropdowns
              <br />
              • Data tables and lists
              <br />
              • Navigation and menus
              <br />• Cards, dialogs, and more
            </Text>
            <Button
              appearance="primary"
              icon={<ArrowRightFilled />}
              iconPosition="after"
              onClick={() => window.open('https://react.fluentui.dev/', '_blank')}
            >
              View Components
            </Button>
          </div>
        </Card>
      </div>

      <Card style={{ width: '100%' }}>
        <div className={styles.cardContent}>
          <Title2>Phase 1.3 Complete ✅</Title2>
          <Text>
            <strong>React Router Integration</strong> - Multi-page navigation with client-side
            routing
          </Text>
          <Text size={300}>
            Navigate between pages using the menu above. Try the Session Demo to see data
            persistence in action, or start the multi-step form to experience a complete user
            journey.
          </Text>
        </div>
      </Card>
    </div>
  );
}
