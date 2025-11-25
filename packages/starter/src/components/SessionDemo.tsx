import { useState } from 'react';
import {
  Button,
  Input,
  Field,
  Card,
  CardHeader,
  Title2,
  Text,
  Spinner,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { SaveFilled, DeleteFilled } from '@fluentui/react-icons';
import { usePrototypeData } from '../hooks/usePrototypeData';

const useStyles = makeStyles({
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
  dataDisplay: {
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: 'monospace',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function SessionDemo() {
  const styles = useStyles();
  const { data, loading, error, setData, clearData } = usePrototypeData<FormData>('demo-form');

  const [formValues, setFormValues] = useState<FormData>({
    name: data?.name || '',
    email: data?.email || '',
    message: data?.message || '',
  });

  const handleSave = async () => {
    await setData(formValues);
  };

  const handleClear = async () => {
    await clearData();
    setFormValues({ name: '', email: '', message: '' });
  };

  if (loading) {
    return (
      <Card className={styles.card}>
        <div className={styles.content}>
          <Spinner label="Loading session data..." />
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<Title2>Session Management Demo</Title2>}
        description={
          <Text>
            This form demonstrates session-based data persistence. Your data is saved in the
            session and persists across page refreshes.
          </Text>
        }
      />
      <div className={styles.content}>
        {error && (
          <Text style={{ color: tokens.colorPaletteRedForeground1 }}>
            Error: {error.message}
          </Text>
        )}

        <Field label="Name">
          <Input
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            placeholder="Enter your name"
          />
        </Field>

        <Field label="Email">
          <Input
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            placeholder="Enter your email"
          />
        </Field>

        <Field label="Message">
          <Input
            value={formValues.message}
            onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
            placeholder="Enter a message"
          />
        </Field>

        <div className={styles.buttonGroup}>
          <Button appearance="primary" icon={<SaveFilled />} onClick={handleSave}>
            Save to Session
          </Button>
          <Button appearance="subtle" icon={<DeleteFilled />} onClick={handleClear}>
            Clear Session
          </Button>
        </div>

        {data && (
          <>
            <Text weight="semibold" style={{ marginTop: '16px' }}>
              Stored Session Data:
            </Text>
            <div className={styles.dataDisplay}>{JSON.stringify(data, null, 2)}</div>
            <div className={styles.status}>
              ✅ Data persisted in session - try refreshing the page!
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
