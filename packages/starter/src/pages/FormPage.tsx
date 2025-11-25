import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Input,
  Field,
  Card,
  Title1,
  Title2,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowRightFilled } from '@fluentui/react-icons';
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
});

interface FormData {
  email: string;
  accountType: string;
  fullName: string;
}

export function FormPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData } = usePrototypeData<FormData>('multi-step-form');
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState<FormData>({
    email: data?.email || '',
    accountType: data?.accountType || '',
    fullName: data?.fullName || '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Update form values when session data changes (e.g., when navigating back)
    if (data) {
      setFormValues(data);
    }
  }, [data]);

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formValues.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    return newErrors;
  };

  const handleNext = async () => {
    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Saving form data:', formValues);
      // Save data and wait for confirmation
      const result = await setData(formValues);
      console.log('Data saved successfully:', result);
      // Navigate after data is confirmed saved
      navigate('/form/step-2');
    } catch (error) {
      console.error('Failed to save form data:', error);
      // Show error to user
      setErrors({ email: 'Failed to save data. Please try again.' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className={styles.container}>
      <FormDisclaimer />
      
      <Title1>Step 1 of 3</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={styles.step} />
            <div className={styles.step} />
          </div>

          <Title2>Email</Title2>

          <Field
            label="Email address"
            required
            validationMessage={errors.email}
            validationState={errors.email ? 'error' : undefined}
          >
            <Input
              ref={firstInputRef}
              type="email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          </Field>

          <Button
            appearance="primary"
            icon={<ArrowRightFilled />}
            iconPosition="after"
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
