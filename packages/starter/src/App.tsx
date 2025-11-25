import {
  Button,
  Title1,
  Title2,
  Text,
  Card,
  CardHeader,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { RocketFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    gap: '32px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: tokens.colorBrandForeground1,
  },
  card: {
    maxWidth: '600px',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
});

function App() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <RocketFilled fontSize={48} />
        <Title1>Fluent Prototype Kit</Title1>
      </div>

      <Card className={styles.card}>
        <CardHeader
          header={<Title2>Welcome to Your Prototype</Title2>}
          description={
            <Text>
              Start building your interactive prototype using Fluent UI React v9 components.
            </Text>
          }
        />
        <div className={styles.content}>
          <Text>
            This is a starter template for rapid prototyping with Microsoft Fluent Design System.
            You can now start adding pages, components, and functionality to your prototype.
          </Text>

          <Text weight="semibold">Next Steps:</Text>
          <Text>
            • Create new pages in the <code>src/pages</code> directory
            <br />
            • Add components from Fluent UI React v9
            <br />
            • Configure routing for multi-page prototypes
            <br />• Customize the theme to match your brand
          </Text>

          <div className={styles.buttonGroup}>
            <Button appearance="primary" icon={<RocketFilled />}>
              Get Started
            </Button>
            <Button appearance="outline">View Documentation</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
