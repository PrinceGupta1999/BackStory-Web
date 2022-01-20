import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, IconButton, Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useContext } from 'react';
import { signOut } from '../../infrastructure/auth/authService';
import { UserContext } from '../../pages/_app';
import Link from '../core/Link';

interface MenuItem {
  href: string;
  name: string;
}

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: (on?: boolean | undefined) => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const menuItems: MenuItem[] = [
    {
      href: '/about',
      name: 'About',
    },
  ];
  const { user } = useContext(UserContext);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton component={Link} href="/">
          <Image
            src={`/images/logo/${
              isDarkMode ? 'light' : 'dark'
            }/logo-sqcircle.svg`}
            width={36}
            height={36}
          />
        </IconButton>
        {user ? (
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Hi, {user.displayName}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: 'inherit',
            }}
          >
            BackStory
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }} px={2}>
          <LightMode />
          <Switch
            color="secondary"
            checked={isDarkMode}
            onChange={(checkedEvent) =>
              toggleDarkMode(checkedEvent.target.checked)
            }
          />
          <DarkMode />
        </Box>

        {menuItems.map(({ name, href }) => (
          <Button color="inherit" key={href} component={Link} href={href}>
            {name}
          </Button>
        ))}
        {user ? (
          <Button
            onClick={async () => {
              await signOut();
            }}
          >
            Sign Out
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
