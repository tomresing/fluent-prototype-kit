import { MessageBar, MessageBarBody, makeStyles } from '@fluentui/react-components';
import { InfoRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  disclaimer: {
    marginBottom: '20px',
  },
});

export function FormDisclaimer() {
  const styles = useStyles();

  return (
    <MessageBar
      className={styles.disclaimer}
      intent="info"
      icon={<InfoRegular />}
    >
      <MessageBarBody>
        <strong>Example form:</strong> This is a demonstration only. All information entered is
        stored locally on your device and is not transmitted to any external servers.
      </MessageBarBody>
    </MessageBar>
  );
}
