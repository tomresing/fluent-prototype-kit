import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Title1,
  Title2,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { CheckmarkCircleFilled, HomeFilled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { usePrototypeData } from '../hooks/usePrototypeData';
import { FormDisclaimer } from '../components/FormDisclaimer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
  },
  successIcon: {
    fontSize: '64px',
    color: tokens.colorPaletteGreenForeground1,
    textAlign: 'center',
  },
  dataDisplay: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dataRow: {
    display: 'flex',
    gap: '8px',
  },
  label: {
    fontWeight: 600,
    minWidth: '100px',
  },
});

interface FormData {
  email: string;
  accountType: string;
  fullName: string;
}

export function ConfirmationPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, clearData, loading } = usePrototypeData<FormData>('multi-step-form');
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    // Wait for loading to complete before checking data
    if (loading) return;
    
    if (data) {
      setFormData(data);
    } else {
      navigate('/form/step-1');
    }
  }, [data, loading, navigate]);

  const handleStartOver = async () => {
    await clearData();
    navigate('/');
  };

  if (!formData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <FormDisclaimer />
      
      <div className={styles.successIcon}>
        <CheckmarkCircleFilled />
      </div>

      <Title1>Success!</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <Title2>You're all set</Title2>

          <div className={styles.dataDisplay}>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Email:</Text>
              <Text>{formData.email}</Text>
            </div>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Account Type:</Text>
              <Text>{formData.accountType}</Text>
            </div>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Full Name:</Text>
              <Text>{formData.fullName}</Text>
            </div>
          </div>

          <Button
            appearance="primary"
            icon={<HomeFilled />}
            onClick={handleStartOver}
          >
            Return home & clear data
          </Button>
        </div>
      </Card>
    </div>
  );
}
