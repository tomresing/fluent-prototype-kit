import {
  makeStyles,
  tokens,
  Tab,
  TabList,
  SelectTabEvent,
  SelectTabData,
} from '@fluentui/react-components';
import { HomeFilled, DatabaseFilled, FormFilled } from '@fluentui/react-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 20px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
});

export function Navigation() {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/form')) return 'form';
    if (location.pathname === '/session-demo') return 'session';
    return 'home';
  };

  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    const value = data.value as string;
    switch (value) {
      case 'home':
        navigate('/');
        break;
      case 'session':
        navigate('/session-demo');
        break;
      case 'form':
        navigate('/form');
        break;
    }
  };

  return (
    <nav className={styles.nav}>
      <TabList selectedValue={getSelectedTab()} onTabSelect={handleTabSelect}>
        <Tab value="home" icon={<HomeFilled />}>
          Home
        </Tab>
        <Tab value="session" icon={<DatabaseFilled />}>
          Session demo
        </Tab>
        <Tab value="form" icon={<FormFilled />}>
          Multi-step form
        </Tab>
      </TabList>
    </nav>
  );
}
