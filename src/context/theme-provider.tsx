import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import i18n, { isRtlLanguage } from '../i18n';

const sharedInputOverrides = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      root: {
        position: 'relative',
        transform: 'none',
        marginBottom: 6,
        fontSize: '0.875rem',
        textAlign: 'left',
        '& .MuiFormLabel-asterisk': {
          display: 'none',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        '& legend': {
          width: 0,
        },
      },
      input: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
  },
} as const;

const lightTheme = createTheme({
  palette: {
    primary: { main: "#183B56", contrastText: "#FFFFFF" },
    secondary: { main: "#0C98A7", contrastText: "#FFFFFF" },
    error: { main: "#D63D48", contrastText: "#FFFFFF" },
    background: { default: "#F3F6F8", paper: "#FFFFFF" },
    text: { primary: "#183B56", secondary: "#697985" },
  },
  components: {
    ...sharedInputOverrides,
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflow: 'auto',
          /* Firefox */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray transparent',

          /* WebKit (Chrome, Edge, Safari) */
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Default styles for all buttons (optional)
          textTransform: "none",
        },
        containedPrimary: {
          // Styles for 'contained' variant with 'primary' color
          "&:hover": {
            backgroundColor: "#087D8C",
          },
        },
        outlined: {
          // Apply white background for all 'outlined' variant buttons
          backgroundColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#f0f0f0", // Optional lighter background on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "#0C98A7",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // '&:hover': {
          //   color: "#087D8C",
          // },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 60,
          textTransform: "none",
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlinedInfo: {
          color: 'rgb(0, 0, 0)',
          border: 'none',
          "& .MuiAlert-icon": {
            color: "#000000",
          },
        },
        standardInfo: {
          backgroundColor: "#DEF4F5",
          color: "#0C98A7",
          "& .MuiAlert-icon": {
            color: "#0C98A7",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.MuiAccordion-root:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 50,

          '&.Mui-expanded': {
            minHeight: 40,
          },
        },
      },
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#21B6C2",
      contrastText: "#102B40",
    },
    secondary: { main: "#4BD0D7", contrastText: "#102B40" },
    error: {
      main: '#D63D48',
      light: '#EA7880',
      dark: '#A62432',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0D2538',
      paper: '#0D2538',
    },
    text: {
      primary: '#ffffff',
      secondary: '#A5B2BC',
    },
  },
  components: {
    ...sharedInputOverrides,
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflow: 'auto',
          /* Firefox */
          scrollbarWidth: 'thin',
          scrollbarColor: 'currentColor transparent',

          /* WebKit (Chrome, Edge, Safari) */
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'currentColor',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: '#ffffff',
          '&.MuiButton-outlined': {
            borderColor: '#ffffff',
            color: '#ffffff',
            "&:hover": {
              borderColor: '#ffffff',
              backgroundColor: 'inherit',
            },
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#087D8C",
          },
        },
        outlined: {
          borderColor: '#0C98A7',
          color: '#0C98A7',
          "&:hover": {
            // backgroundColor: 'rgba(255, 0, 195, 0.08)',
            borderColor: '#087D8C',
          },
          '&.MuiButton-outlinedError': {
            borderColor: '#D63D48',
            color: '#D63D48',
            "&:hover": {
              // backgroundColor: 'rgba(244, 67, 54, 0.08)',
              borderColor: '#A62432',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#087D8C',
          "&:hover": {
            color: "#0C98A7",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          // "&:hover": {
          //   backgroundColor: 'rgba(255, 0, 195, 0.08)',
          // },
          '&.MuiIconButton-colorError': {
            color: '#D63D48',
            // "&:hover": {
            //   backgroundColor: 'rgba(244, 67, 54, 0.08)',
            // },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 60,
          textTransform: "none",
          color: '#ffffff',
          "&.Mui-selected": {
            color: '#0C98A7',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlinedInfo: {
          color: '#ffffff',
          border: 'none',
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        },
        standardInfo: {
          backgroundColor: "#143247",
          color: "#0C98A7",
          "& .MuiAlert-icon": {
            color: "#0C98A7",
          },
        },
      },
    },
    // Additional dark mode specific components
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0D2538',
          border: '1px solid #143247',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#143247',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#143247',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #143247',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#494949ff',
        },
      },
    },
    //   MuiTextField:{
    //     styleOverrides: {
    //       root: {
    //         '& .MuiInputBase-root': {
    //           backgroundColor: '#1d1c1cff',
    //         },
    //   }
    // }}
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.MuiAccordion-root:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 50,

          '&.Mui-expanded': {
            minHeight: 40,
          },
        },
      },
    },
  },
});

const ThemeModeContext = createContext({
  toggleTheme: () => { },
  darkMode: false,
});

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  // Load saved mode from localStorage or default to light mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleTheme = () => {
    setDarkMode((prevMode: any) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save new mode to localStorage
      return newMode;
    });
  };

  const [direction, setDirection] = useState<'ltr' | 'rtl'>(() =>
    isRtlLanguage() ? 'rtl' : 'ltr'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode)); // Save initial mode
  }, [darkMode]);

  // Language is resolved asynchronously (http backend), so follow it instead of
  // reading it once on mount.
  useEffect(() => {
    const handleLanguageChanged = (lng: string) =>
      setDirection(isRtlLanguage(lng) ? 'rtl' : 'ltr');

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Merge the direction into the base theme so MUI components (Drawer, Menu,
  // Tabs, Slider...) lay themselves out RTL-aware.
  const theme = useMemo(
    () => createTheme(darkMode ? darkTheme : lightTheme, { direction }),
    [darkMode, direction]
  );

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;