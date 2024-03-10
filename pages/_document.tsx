import { Head, Html, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html lang="en" className="dark" suppressHydrationWarning>
      <Head />
      <body className="dark:bg-[#161615]">
     
        <Main />
        <NextScript />
      
      </body>
    </Html>
  );
}
