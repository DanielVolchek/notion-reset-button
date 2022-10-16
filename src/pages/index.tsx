import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const pressedResetButton = async () => {
    await fetch("/api/update");
    console.log("done resetting");
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-black ">
      <button
        onClick={pressedResetButton}
        className="border-none bg-blue-500 py-6 px-8 text-2xl shadow-md transition-transform duration-[250ms] hover:scale-105 hover:bg-blue-600"
      >
        Press To Reset
      </button>
    </main>
  );
};

export default Home;
