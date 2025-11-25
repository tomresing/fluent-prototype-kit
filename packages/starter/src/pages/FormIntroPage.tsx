import {
  Button,
  Card,
  Title1,
  Title2,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowRightFilled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { FormDisclaimer } from '../components/FormDisclaimer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  card: {
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '24px',
  },
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '8px',
  },
  stepItem: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  stepNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    height: '32px',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: '16px',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  stepTitle: {
    fontWeight: 600,
    fontSize: '16px',
  },
  stepDescription: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
  },
  infoBox: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
  },
});

export function FormIntroPage() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <FormDisclaimer />
      
      <Title1>Account registration</Title1>

      <Card className={styles.card}>
        <div className={styles.content}>
          <Title2>3 quick steps</Title2>

          <div className={styles.stepList}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Email</div>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Account type</div>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Name</div>
              </div>
            </div>
          </div>

          <Button
            appearance="primary"
            icon={<ArrowRightFilled />}
            iconPosition="after"
            onClick={() => navigate('/form/step-1')}
            size="large"
          >
            Start registration
          </Button>
        </div>
      </Card>
    </div>
  );
}
