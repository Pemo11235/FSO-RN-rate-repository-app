import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#fff',
    error: '#d73a4a',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    h1: 20,
    h2: 18,
    h3: 17,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      defualt: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  spacing: {
    small: 4,
    medium: 8,
    large: 16,
  },
  radius: {
    small: 4,
    medium: 8,
    large: 16,
  },
}

export default theme
