import { SessionDemo } from '../components/SessionDemo';
import { Title1, Text, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto',
  },
});

export function SessionDemoPage() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Title1>Session management demo</Title1>
      <Text>
        This demonstrates how prototype data persists across pages using server-side sessions.
      </Text>
      <SessionDemo />
    </div>
  );
}
