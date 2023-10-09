import { DevCard } from "@/components/DevCard";
import { Footer } from "@/components/Footer";
import { LoginNav } from "@/components/LoginNav";
import Image from "next/image";
import Link from "next/link";
import { Fade, Zoom } from "react-awesome-reveal";

const index = () => {
  return (
    <main className="w-full h-screen">
      <LoginNav />
      <div className="h-5/6 w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex flex-col items-center justify-center p-4">
          <div className="w-full md:w-4/5 text-center">
            <h1 className="text-4xl lg:text-5xl my-8 text-primary dark:text-secondary">Comparte y Paga</h1>
            <p>
              En Zoren, estamos redefiniendo la forma en que compartes gastos y
              simplificamos tus transacciones con criptomonedas. Nuestra
              plataforma innovadora te permite dividir las cuentas de manera
              eficiente entre amigos, familiares o compañeros de equipo,
              facilitando la gestión de gastos compartidos y brindándote una
              experiencia financiera colaborativa sin complicaciones.
            </p>
          </div>
          <p className="absolute -rotate-90 -right-24 text-slate-400 hidden lg:block">
            - Image by{" "}
            <Link
              className="font-bold hover:text-white transition duration-300 ease-linear"
              href="https://www.pexels.com/es-es/@mikhail-nilov/"
            >
              Mikhail Nilov
            </Link>{" "}
            on{" "}
            <Link
              className="font-bold hover:text-white transition duration-300 ease-linear"
              href="https://www.pexels.com/es-es/"
            >
              Pexels
            </Link>
          </p>
        </div>
        <Fade
          direction="up"
          triggerOnce
          duration={300}
          className="hidden lg:block"
        >
          <Image
            src="https://images.pexels.com/photos/9543814/pexels-photo-9543814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="friends"
            // style={{
            //   width: '100%',
            // }}
            width={100}
            priority
            height={100}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </Fade>
      </div>

      {/* our team section */}
      <div className="w-full h-auto md:h-screen p-4 flex flex-col justify-around">
        <div className="text-center p-4 my-10 md:my-0">
          <h1 className="text-4xl lg:text-5xl text-primary dark:text-secondary">Our Team</h1>
        </div>
        <div className="w-full lg:w-3/5  h-4/6 mx-auto grid place-items-center grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-6">
          <Zoom cascade triggerOnce duration={300}>
            <DevCard
              image="https://avatars.githubusercontent.com/u/74383100?v=4"
              name="Jonathan Ocampo"
              route="https://github.com/jonocrod12"
            />
            <DevCard
              image="https://avatars.githubusercontent.com/u/76269262?v=4"
              name="Angel Lopez"
              route="https://github.com/srteerra"
            />
            <DevCard
              image="https://avatars.githubusercontent.com/u/74383095?v=4"
              name="Carlos Sanchez"
              route="https://github.com/Guapura89"
            />
          </Zoom>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default index;
