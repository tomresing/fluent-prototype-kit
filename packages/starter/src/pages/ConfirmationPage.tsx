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
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
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
      navigate('/form');
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
      <div className={styles.successIcon}>
        <CheckmarkCircleFilled />
      </div>

      <Title1>Success!</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <Title2>Form Submitted</Title2>
          <Text>
            Thank you for completing the multi-step form. Here's a summary of the information you
            provided:
          </Text>

          <div className={styles.dataDisplay}>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Name:</Text>
              <Text>{formData.name}</Text>
            </div>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Email:</Text>
              <Text>{formData.email}</Text>
            </div>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Company:</Text>
              <Text>{formData.company}</Text>
            </div>
            <div className={styles.dataRow}>
              <Text className={styles.label}>Role:</Text>
              <Text>{formData.role}</Text>
            </div>
            {formData.message && (
              <div className={styles.dataRow}>
                <Text className={styles.label}>Message:</Text>
                <Text>{formData.message}</Text>
              </div>
            )}
          </div>

          <Text size={300}>
            This data was preserved across all three steps using session storage. Try refreshing
            the page - your data is still here!
          </Text>

          <Button
            appearance="primary"
            icon={<HomeFilled />}
            onClick={handleStartOver}
          >
            Return Home & Clear Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
