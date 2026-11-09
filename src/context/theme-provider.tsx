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
    primary: {
      main: "#11889c",
      contrastText: "#ffffff",
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
            backgroundColor: "#2da6b7",
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
            color: "#11889c",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // '&:hover': {
          //   color: "#2da6b7",
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
          backgroundColor: "#e3f3f5",
          color: "#11889c",
          "& .MuiAlert-icon": {
            color: "#11889c",
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
      main: "#11889c",
      contrastText: "#ffffff",
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000ff',
      paper: '#000000ff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
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
            backgroundColor: "#2da6b7",
          },
        },
        outlined: {
          borderColor: '#11889c',
          color: '#11889c',
          "&:hover": {
            // backgroundColor: 'rgba(255, 0, 195, 0.08)',
            borderColor: '#2da6b7',
          },
          '&.MuiButton-outlinedError': {
            borderColor: '#f44336',
            color: '#f44336',
            "&:hover": {
              // backgroundColor: 'rgba(244, 67, 54, 0.08)',
              borderColor: '#d32f2f',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#2da6b7',
          "&:hover": {
            color: "#11889c",
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
            color: '#f44336',
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
            color: '#11889c',
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
          backgroundColor: "#080808ff",
          color: "#11889c",
          "& .MuiAlert-icon": {
            color: "#11889c",
          },
        },
      },
    },
    // Additional dark mode specific components
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000ff',
          border: '1px solid #080808ff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#080808ff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#080808ff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #080808ff',
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