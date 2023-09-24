import { DarkMode } from "./DarkMode";
import RegionChange from "./Region";
import Link from "next/link";
import { useRouter } from "next/router";

function Nav({data}) {
    const router = useRouter();
    return(
        <div className="w-full hidden lg:flex items-center justify-between py-12">
            {data.isSubpage ? (
                <h1 className="capitalize"><Link href={`/${data.title}`} className="opacity-60 capitalize">{data.title} / </Link>{router.query.name}</h1>
            ) : (
                <h1 className="capitalize">{data.title}</h1>
            )}
            <div className="items-center gap-4 hidden lg:flex">
                <DarkMode />
                <RegionChange />
            </div>
        </div>
    )
}

export default Nav;
