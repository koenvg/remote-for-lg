import AsyncStorage from '@react-native-async-storage/async-storage';
import {option, task, taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Appearance, ViewStyle} from 'react-native';

const slate = {
  0: '#ffffff',
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
};

const grey = {
  0: '#ffffff',
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
};

const zinc = {
  0: '#ffffff',
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
};

const primary = slate;

const keyColorScheme = 'settings_colorScheme';

interface ThemeContextProps {
  colorScheme: 'light' | 'dark';
  changeColorScheme(scheme: 'light' | 'dark'): void;
}
const ThemeContext = createContext<ThemeContextProps>({} as any);

function retrieveColorScheme() {
  return pipe(
    taskEither.tryCatch(
      () =>
        AsyncStorage.getItem(keyColorScheme) as Promise<
          'dark' | 'light' | undefined
        >,
      String,
    ),
    taskEither.map(option.fromNullable),
  );
}
function getSystemColorScheme() {
  return pipe(
    Appearance.getColorScheme(),
    option.fromNullable,
    option.getOrElse(() => 'light' as 'light' | 'dark'),
  );
}

export const ThemeProvider: FunctionComponent = ({children}) => {
  const [colorScheme, setColorScheme] = useState<
    'light' | 'dark' | undefined
  >();

  function changeColorScheme(scheme: 'light' | 'dark') {
    setColorScheme(scheme);
    AsyncStorage.setItem(keyColorScheme, scheme);
  }

  useEffect(() => {
    const fn = pipe(
      retrieveColorScheme(),
      taskEither.map(option.getOrElse(getSystemColorScheme)),
      taskEither.getOrElse(() => task.of(getSystemColorScheme())),
      task.map(setColorScheme),
    );

    fn();
  }, []);

  if (!colorScheme) return null;

  return (
    <ThemeContext.Provider value={{changeColorScheme, colorScheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

const useMyColorScheme = () => useContext(ThemeContext);

export const useMyTheme = () => {
  const {colorScheme, changeColorScheme} = useMyColorScheme();
  const theme = {
    primary,
    red: '#dc2626',
    green: '#16a34a',
    accent: '#6366f1',
    iconColor: colorScheme === 'light' ? primary[600] : primary[200],
    iconSize: 24,
    textColor: colorScheme === 'light' ? primary[800] : primary[100],
    neumorphismLight: colorScheme === 'light' ? primary[100] : primary[700],
    neumorphismDark: colorScheme === 'light' ? primary[300] : primary[900],
    background: colorScheme === 'light' ? primary[200] : primary[800],
    button: {
      background: colorScheme === 'light' ? primary[700] : primary[900],
    },
    input: {
      borderColor: colorScheme === 'light' ? primary[800] : primary[200],
    } as ViewStyle,
  };

  return {
    theme,
    colorScheme,
    changeColorScheme,
  };
};
