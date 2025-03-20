
import { ApolloWrapper } from "@/lib/apollo/apolloWrapper";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { theme } from "@/styles/theme";
import { ClientProviders } from "./providers";

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                />


                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />


                <title>Golabra</title>

            </head>

            <body>
               
                    <InitColorSchemeScript defaultMode="dark" modeStorageKey="theme-mode" attribute="class" />
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        <ThemeProvider theme={theme} defaultMode="dark" modeStorageKey="theme-mode">
                            <ApolloWrapper>
                                <ClientProviders>
                                    <CssBaseline enableColorScheme />
                                    {children}
                                </ClientProviders>
                            </ApolloWrapper>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
      
            </body>
        </html>
    );
}
