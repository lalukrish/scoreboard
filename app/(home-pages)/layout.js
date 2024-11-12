// Layout.js for home screens
import AppBar from "@/components/sidebar";

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
