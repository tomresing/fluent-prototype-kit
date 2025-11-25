import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Input,
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
  stepComplete: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
});

interface FormData {
  email: string;
  accountType: string;
  fullName: string;
}

export function FormStep3Page() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData, loading } = usePrototypeData<FormData>('multi-step-form');
  const inputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState<FormData>({
    email: '',
    accountType: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Wait for loading to complete before checking data
    if (loading) return;
    
    if (data) {
      setFormValues(data);
      inputRef.current?.focus();
    } else {
      navigate('/form/step-1');
    }
  }, [data, loading, navigate]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await setData(formValues);
      navigate('/confirmation');
    } catch (error) {
      console.error('Failed to save form data:', error);
      setErrors({ fullName: 'Failed to save data. Please try again.' });
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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <FormDisclaimer />
      
      <Title1>Step 3 of 3</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepComplete}`} />
            <div className={`${styles.step} ${styles.stepComplete}`} />
            <div className={`${styles.step} ${styles.stepActive}`} />
          </div>

          <Title2>Name</Title2>

          <Field
            label="Full name"
            required
            validationMessage={errors.fullName}
            validationState={errors.fullName ? 'error' : undefined}
          >
            <Input
              ref={inputRef}
              value={formValues.fullName}
              onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
              onKeyDown={handleKeyDown}
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
