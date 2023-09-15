/* eslint-disable react-hooks/exhaustive-deps */
import { Fade } from "react-awesome-reveal";
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
      className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 p-2 rounded-xl hover:cursor-legacyp"
    >
      {click ? <MoonIcon width={25} /> : <SunIcon width={25} />}
    </button>
  );
};

export default DarkMode;
