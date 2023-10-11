import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Zoom } from "react-awesome-reveal";

const DevCard = (props) => {
  return (
    <div className="w-full h-auto md:h-3/5 rounded-2xl">
      <div className="p-4 h-full flex flex-col items-center text-center justify-center gap-6">
        <Image className="rounded-full" src={props.image || 'https://avatars.githubusercontent.com/u/74383100?v=4'} width={100} height={100} alt="profile-image"/>
        <h3>{props.name || 'username'}</h3>
        <Link href={props.route || '/'} target="_bank" className="hover:opacity-75 transition duration-150 ease-linear focus:scale-95">
          <FontAwesomeIcon icon={faGithub} className="w-10 h-10" />
        </Link>
      </div>
    </div>
  );
}

export {DevCard};