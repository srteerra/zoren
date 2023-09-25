// Images
import Image from "next/image";
import logo_l from "../../public/logos/horizontal-light.png";
import logo from "../../public/logos/horizontal-color.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full h-4/6 sm:h-2/6 bg-white dark:bg-dark">
      <div className="w-4/5 mx-auto h-full grid sm:grid-cols-3 place-items-center">
        <div className="block dark:hidden">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div className="hidden dark:block">
          <Image src={logo_l} alt="logo" width={100} height={100} />
        </div>
        <div>
          <ul className="flex flex-col text-center sm:text-left gap-y-2">
            {[
              ["Home", "/"],
              ["How it works?", "/how"],
              ["About us", "/about"],
            ].map(([title, href]) => (
              <li key={title}>
                <Link
                  className="text-dark dark:text-white hover:text-secondary dark:hover:text-secondary  transition duration-150 ease-linear"
                  href={href}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 text-dark items-center justify-center">
          <ul className="flex gap-4 p-4 sm:p-2 border-dark dark:border-white border-b-2">
              {[
                ["facebook", faFacebook, "/"],
                ["twitter", faTwitter, "/"],
                ["github", faGithub, "/"],
              ].map(([title, icon, href]) => (
                <li key={title}>
                  <Link
                    className="dark:text-white"
                    href={href}
                  >
                    <FontAwesomeIcon icon={icon} className="w-8 sm:w-6 h-8 sm:h-6 hover:scale-110 transition duration-150 ease-linear" />
                  </Link>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
