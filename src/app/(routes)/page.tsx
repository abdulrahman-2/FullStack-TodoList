import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiTask } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between gap-20">
        <BiTask className="hidden md:block size-20 -rotate-45 text-primary" />
        <div className="text-center">
          <h1 className="text-3xl text-nowrap md:text-4xl lg:text-6xl leading-[1.2] font-bold">
            Welcome to Amazing <br />{" "}
            <span className="text-primary">Quick Task</span> App 🚀
          </h1>
          <p className="mt-5 font-semibold text-sm md:text-xl max-w-[60%] mx-auto text-secondary-foreground">
            Quick Task is your go-to solution for managing tasks effortlessly.
            Stay organized, save time.
          </p>
        </div>
        <FaTasks className="hidden md:block size-20 -rotate-45 text-primary" />
      </div>
      <Link href="/login">
        <Button className="mt-10 w-[120px] md:w-[200px] font-bold text-lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Home;
