import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";
export default function Home() {
  return (
    <><Header />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Welcome To Mock AI Expert Interviewer</h2>

    </div>
    <Footer/>
    </>
 );
}
