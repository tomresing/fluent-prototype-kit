import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Textarea,
  Field,
  Card,
  Title1,
  Title2,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowLeftFilled, CheckmarkFilled } from '@fluentui/react-icons';
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
  progress: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  step: {
    flex: 1,
    height: '4px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  stepActive: {
    backgroundColor: tokens.colorBrandBackground,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
});

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export function FormStep3Page() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData, loading } = usePrototypeData<FormData>('multi-step-form');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [formValues, setFormValues] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });

  useEffect(() => {
    // Wait for loading to complete before checking data
    if (loading) return;
    
    if (data) {
      setFormValues(data);
      textareaRef.current?.focus();
    } else {
      navigate('/form');
    }
  }, [data, loading, navigate]);

  const handleSubmit = async () => {
    try {
      await setData(formValues);
      navigate('/confirmation');
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  };

  const handleBack = async () => {
    try {
      // Save current form data before going back
      await setData(formValues);
      navigate('/form/step-2');
    } catch (error) {
      console.error('Failed to save form data:', error);
      // Navigate anyway even if save fails
      navigate('/form/step-2');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <Title1>Multi-Step Form - Step 3</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={`${styles.step} ${styles.stepActive}`} />
          </div>

          <Title2>Additional Information</Title2>
          <Text>Any additional comments or questions?</Text>

          <Field label="Message (Optional)">
            <Textarea
              ref={textareaRef}
              value={formValues.message}
              onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Tell us anything you'd like... (Press Ctrl+Enter to submit)"
              rows={6}
            />
          </Field>

          <div className={styles.buttonGroup}>
            <Button
              appearance="secondary"
              icon={<ArrowLeftFilled />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              appearance="primary"
              icon={<CheckmarkFilled />}
              iconPosition="after"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
