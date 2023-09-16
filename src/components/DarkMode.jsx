/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useEffect } from "react";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [click, setClick] = useState(false);

  useEffect(() => {
    theme === "dark" ? setClick(false) : setClick(true);
  }, [])


  const handleClick = () => {
    setClick(!click);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <button
      onClick={() => handleClick()}
      className="text-black dark:text-white bg-transparent hover:scale-105 transition duration-150 ease-linear p-2 rounded-xl"
    >
      {click ? <MoonIcon width={25} /> : <SunIcon width={25} />}
    </button>
  );
};

const DarkModeMobile = () => {
  const { theme, setTheme } = useTheme();
  const [click, setClick] = useState(false);

  useEffect(() => {
    theme === "dark" ? setClick(false) : setClick(true);
  }, [])


  const handleClick = () => {
    setClick(!click);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <button
      onClick={() => handleClick()}
      className="text-dark bg-transparent hover:scale-105 transition duration-150 ease-linear p-2 rounded-xl"
    >
      {click ? <MoonIcon width={25} /> : <SunIcon width={25} />}
    </button>
  );
};

export {DarkMode, DarkModeMobile};
