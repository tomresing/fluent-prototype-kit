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
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
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

export function FormStep2Page() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData, loading } = usePrototypeData<FormData>('multi-step-form');
  const firstInputRef = useRef<HTMLInputElement>(null);

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
    
    console.log('FormStep2 loaded, data from session:', data);
    if (data) {
      setFormValues(data);
      firstInputRef.current?.focus();
    } else {
      // Redirect to step 1 if no data
      console.warn('No data found, redirecting to step 1');
      navigate('/form');
    }
  }, [data, loading, navigate]);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formValues.company.trim()) newErrors.company = 'Company is required';
    if (!formValues.role.trim()) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleNext = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await setData(formValues);
      navigate('/form/step-3');
    } catch (error) {
      console.error('Failed to save form data:', error);
      setErrors({ company: 'Failed to save data. Please try again.' });
    }
  };

  const handleBack = async () => {
    try {
      // Save current form data before going back
      await setData(formValues);
      navigate('/form');
    } catch (error) {
      console.error('Failed to save form data:', error);
      // Navigate anyway even if save fails
      navigate('/form');
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
      <Title1>Multi-Step Form - Step 2</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={styles.step} />
          </div>

          <Title2>Professional Details</Title2>
          <Text>Tell us about your work.</Text>

          <Field
            label="Company"
            required
            validationMessage={errors.company}
            validationState={errors.company ? 'error' : undefined}
          >
            <Input
              ref={firstInputRef}
              value={formValues.company}
              onChange={(e) => setFormValues({ ...formValues, company: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Microsoft"
            />
          </Field>

          <Field
            label="Role"
            required
            validationMessage={errors.role}
            validationState={errors.role ? 'error' : undefined}
          >
            <Input
              value={formValues.role}
              onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Product Designer"
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
              icon={<ArrowRightFilled />}
              iconPosition="after"
              onClick={handleNext}
            >
              Next Step
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
