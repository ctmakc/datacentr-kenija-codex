import "@/styles/globals.css";

export const metadata = {
  title: "Kenya AI Compute",
  description: "Powering Africa's AI Future"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
