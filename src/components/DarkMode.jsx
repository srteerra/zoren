import { Fade } from "react-awesome-reveal";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <button
      onClick={() => handleClick()}
      className="bg-black text-white dark:bg-transparent dark:text-white p-2 rounded-xl hover:cursor-legacyp"
    >
      {click ? <MoonIcon width={25} /> : <SunIcon width={25} />}
    </button>
  );
};

export default DarkMode;
