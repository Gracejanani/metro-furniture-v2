import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import InitialLoader from "@/components/InitialLoader";
import AnimatedBackground from "@/components/AnimatedBackground";
import ChatAssistant from "@/components/ChatAssistant";

export default function WebsiteLayout({ children }) {
  return (
    <div className="relative flex min-h-full flex-col bg-transparent font-sans text-foreground">
      <AnimatedBackground />
      <InitialLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
      <ChatAssistant />
    </div>
  );
}
