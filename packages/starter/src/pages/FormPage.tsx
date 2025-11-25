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
import { ArrowRightFilled } from '@fluentui/react-icons';
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
});

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export function FormPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData } = usePrototypeData<FormData>('multi-step-form');
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState<FormData>({
    name: data?.name || '',
    email: data?.email || '',
    company: data?.company || '',
    role: data?.role || '',
    message: data?.message || '',
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
    if (!formValues.name.trim()) newErrors.name = 'Name is required';
    if (!formValues.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = 'Email is invalid';
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
      setErrors({ name: 'Failed to save data. Please try again.' });
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
      <Title1>Multi-Step Form - Step 1</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={styles.step} />
            <div className={styles.step} />
          </div>

          <Title2>Personal Information</Title2>
          <Text>Please provide your basic information to continue.</Text>

          <Field
            label="Full Name"
            required
            validationMessage={errors.name}
            validationState={errors.name ? 'error' : undefined}
          >
            <Input
              ref={firstInputRef}
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="John Doe"
            />
          </Field>

          <Field
            label="Email"
            required
            validationMessage={errors.email}
            validationState={errors.email ? 'error' : undefined}
          >
            <Input
              type="email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="john.doe@example.com"
            />
          </Field>

          <Button
            appearance="primary"
            icon={<ArrowRightFilled />}
            iconPosition="after"
            onClick={handleNext}
          >
            Next Step
          </Button>
        </div>
      </Card>
    </div>
  );
}
