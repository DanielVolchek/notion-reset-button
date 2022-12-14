import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const pressedResetButton = async () => {
    fetch("/api/update")
      .then(() => console.log("sucessfully reset data"))
      .catch((err) => console.log("failed to fetch data, err: ", err));
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#212529] ">
      <button
        onClick={pressedResetButton}
        className="border-none bg-blue-600 py-6
        px-8
        text-2xl
        text-white shadow-md transition-all duration-[250ms] hover:scale-105 hover:bg-blue-500 active:bg-emerald-300 "
      >
        Press To Reset
      </button>
    </main>
  );
};

export default Home;
