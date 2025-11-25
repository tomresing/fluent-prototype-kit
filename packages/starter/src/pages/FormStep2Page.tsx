import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Field,
  Card,
  Title1,
  Title2,
  Text,
  Radio,
  RadioGroup,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
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

export function FormStep2Page() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { data, setData, loading } = usePrototypeData<FormData>('multi-step-form');
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState<FormData>({
    email: '',
    accountType: '',
    fullName: '',
  });

  useEffect(() => {
    // Wait for loading to complete before checking data
    if (loading) return;
    
    console.log('FormStep2 loaded, data from session:', data);
    if (data) {
      setFormValues(data);
      // Focus the RadioGroup container
      setTimeout(() => radioGroupRef.current?.focus(), 0);
    } else {
      // Redirect to step 1 if no data
      console.warn('No data found, redirecting to step 1');
      navigate('/form/step-1');
    }
  }, [data, loading, navigate]);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formValues.accountType) newErrors.accountType = 'Please select an account type';
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
      setErrors({ accountType: 'Failed to save data. Please try again.' });
    }
  };

  const handleBack = async () => {
    try {
      // Save current form data before going back
      await setData(formValues);
      navigate('/form/step-1');
    } catch (error) {
      console.error('Failed to save form data:', error);
      // Navigate anyway even if save fails
      navigate('/form/step-1');
    }
  };

  return (
    <div className={styles.container}>
      <FormDisclaimer />
      
      <Title1>Step 2 of 3</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${styles.stepComplete}`} />
            <div className={`${styles.step} ${styles.stepActive}`} />
            <div className={styles.step} />
          </div>

          <Title2>Account type</Title2>

          <Field
            required
            validationMessage={errors.accountType}
            validationState={errors.accountType ? 'error' : undefined}
          >
            <RadioGroup
              ref={radioGroupRef as any}
              value={formValues.accountType}
              onChange={(_, data) => setFormValues({ ...formValues, accountType: data.value })}
            >
              <Radio
                value="Individual"
                label="Individual"
              />
              <Radio
                value="Organization"
                label="Organization"
              />
            </RadioGroup>
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
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
