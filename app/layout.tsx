import '@styles/styles.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className="font-LexendDeca font-light">{children}</body>
    </html>
  );
}
