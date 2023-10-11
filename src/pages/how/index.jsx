import { Footer } from "@/components/Footer";
import { LoginNav } from "@/components/LoginNav";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faUser,
  faArrowRightLong,
  faBrain,
  faMoneyBill,
  faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";
import { Fade, Zoom } from "react-awesome-reveal";
import { useRouter } from "next/router";

const HowItWorks = () => {
  const { asPath, locale, locales } = useRouter();

  return (
    <main className="w-full h-screen">
      <LoginNav />
      <div className="w-full relative h-5/6 flex flex-col items-center justify-center text-center gap-y-20 p-4">
        <span className="absolute animate-wiggle left-1/4 top-1/3 hidden sm:block">
          <FontAwesomeIcon icon={faBrain} className="w-10 h-10 opacity-50" />
        </span>
        <span className="absolute animate-wiggleRev right-1/4 top-1/3 hidden sm:block">
          <FontAwesomeIcon icon={faMoneyBill} className="w-10 h-10 opacity-50" />
        </span>
        <span className="absolute animate-wiggle top-[10%] hidden sm:block">
          <FontAwesomeIcon icon={faPeopleGroup} className="w-10 h-10 opacity-50" />
        </span>
        <div>
          <h1 className="text-primary text-4xl lg:text-5xl my-2">
            {locale === "fr"
              ? "Apprendre"
              : locale === "es"
              ? "Aprender"
              : locale === "pt"
              ? "Aprender"
              : locale === "de"
              ? "Lernen"
              : "Learn"}
          </h1>
          <p className="font-light">
            {locale === "fr"
              ? "Qu'est-ce que Zoren vous offre?"
              : locale === "es"
              ? "¿Qué te ofrece Zoren?"
              : locale === "pt"
              ? "O que a Zoren oferece a você?"
              : locale === "de"
              ? "Was bietet Ihnen Zoren?"
              : "What Zoren offers to you?"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full md:w-1/2 lg:w-1/3 mx-auto">
          <p className="font-light">
            {locale === "fr"
              ? "Veuillez consulter notre Politique de confidentialité et nos Conditions d'utilisation. Il s'agit d'un projet pour le Hackathon Hyperdrive."
              : locale === "es"
              ? "Por favor, consulte nuestra Política de privacidad y Términos y Condiciones. Este es un proyecto para el Hackathon Hyperdrive."
              : locale === "pt"
              ? "Por favor, verifique nossa Política de Privacidade e Termos e Condições. Este é um projeto para o Hackathon Hyperdrive."
              : locale === "de"
              ? "Bitte überprüfen Sie unsere Datenschutzrichtlinie und Nutzungsbedingungen. Dies ist ein Projekt für den Hyperdrive Hackathon."
              : "Please check our Privacy Policy and Terms and Conditions. This is a project for Hyperdrive Hackathon."}
          </p>

          <ChevronDoubleDownIcon className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      <div className="w-full h-screen p-4">
        <div className="grid grid-col-1 md:grid-cols-2 h-full grid-rows-4 md:grid-rows-2 gap-2 md:w-4/5 2xl:w-3/5 mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="sm:w-3/5 md:w-4/5">
              <p className="text-4xl lg:text-5xl py-4 font-light">
                {locale === "fr"
                  ? "Partager les paiements de factures"
                  : locale === "es"
                  ? "Dividir los pagos de la factura"
                  : locale === "pt"
                  ? "Dividir pagamentos de contas"
                  : locale === "de"
                  ? "Rechnungszahlungen aufteilen"
                  : "Split bill payments"}
              </p>
              <p className="font-light">
                {locale === "fr"
                  ? "Veuillez vérifier notre Politique de confidentialité et nos Conditions générales. Il s'agit d'un projet pour le Hackathon Hyperdrive."
                  : locale === "es"
                  ? "Por favor, consulte nuestra Política de privacidad y Términos y condiciones. Este es un proyecto para el Hackathon Hyperdrive."
                  : locale === "pt"
                  ? "Por favor, verifique nossa Política de Privacidade e Termos e Condições. Este é um projeto para o Hyperdrive Hackathon."
                  : locale === "de"
                  ? "Bitte überprüfen Sie unsere Datenschutzrichtlinie und Allgemeinen Geschäftsbedingungen. Dies ist ein Projekt für den Hyperdrive Hackathon."
                  : "Please check our Privacy Policy and Terms and Conditions. This is a project for Hyperdrive Hackathon."}
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 mx-auto sm:w-1/2">
            <div className="flex items-center justify-center">
              <Zoom triggerOnce>
                <span className="">
                  <FontAwesomeIcon icon={faReceipt} className="w-10 h-10" />
                </span>
              </Zoom>
            </div>
            <div className="flex items-center justify-center">
              <Fade direction="left" delay={500} duration={300} triggerOnce>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className="w-8 h-8"
                  />
                </span>
              </Fade>
            </div>
            <div className="flex flex-col items-center justify-around md:justify-center md:gap-4">
              <Fade
                direction="left"
                delay={700}
                duration={300}
                cascade
                triggerOnce
              >
                <span className="text-center">
                  <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
                </span>
                <span>
                  <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
                </span>
                <span>
                  <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
                </span>
              </Fade>
            </div>
          </div>

          <div className="order-last md:order-3 flex items-center justify-center gap-4">
            <Zoom duration={300} cascade triggerOnce>
              <span className="bg-secondary dark:bg-primary p-4 rounded-lg grid place-items-center">
                <FontAwesomeIcon icon={faReceipt} className="h-8 w-8" />
              </span>
              <span className="bg-secondary dark:bg-primary p-4 rounded-lg grid place-items-center">
                <FontAwesomeIcon icon={faReceipt} className="h-8 w-8" />
              </span>
              <span className="bg-secondary dark:bg-primary p-4 rounded-lg grid place-items-center">
                <FontAwesomeIcon icon={faReceipt} className="h-8 w-8" />
              </span>
            </Zoom>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 order-3 md:order-last">
            <div className="sm:w-3/5 md:w-4/5">
              <p className="text-4xl lg:text-5xl py-4 font-light">
                {locale === "fr"
                  ? "Regrouper les factures en collections"
                  : locale === "es"
                  ? "Agrupar facturas en colecciones"
                  : locale === "pt"
                  ? "Agrupar contas em coleções"
                  : locale === "de"
                  ? "Rechnungen in Sammlungen gruppieren"
                  : "Group bills into collections"}
              </p>
              <p className="font-light">
                {locale === "fr"
                  ? "Veuillez vérifier notre Politique de confidentialité et nos Conditions générales. Il s'agit d'un projet pour le Hackathon Hyperdrive."
                  : locale === "es"
                  ? "Por favor, consulte nuestra Política de privacidad y Términos y condiciones. Este es un proyecto para el Hackathon Hyperdrive."
                  : locale === "pt"
                  ? "Por favor, verifique nossa Política de Privacidade e Termos e Condições. Este é um projeto para o Hackathon Hyperdrive."
                  : locale === "de"
                  ? "Bitte überprüfen Sie unsere Datenschutzrichtlinie und Allgemeinen Geschäftsbedingungen. Dies ist ein Projekt für den Hyperdrive Hackathon."
                  : "Please check our Privacy Policy and Terms and Conditions. This is a project for Hyperdrive Hackathon."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen p-4">
        <div className="h-full w-full flex flex-col justify-center">
          <div className="mb-20">
            <p className="text-4xl lg:text-5xl py-4 text-primary">
              {locale === "fr"
                ? "Tutoriels"
                : locale === "es"
                ? "Tutoriales"
                : locale === "pt"
                ? "Tutoriais"
                : locale === "de"
                ? "Anleitungen"
                : "Tutorials"}
            </p>
            <p>
              {locale === "fr"
                ? "En utilisant"
                : locale === "es"
                ? "Usando"
                : locale === "pt"
                ? "Usando"
                : locale === "de"
                ? "Verwenden"
                : "Using"}{" "}
              <span className="text-primary font-bold">Solana</span>{" "}
              {locale === "fr"
                ? "et"
                : locale === "es"
                ? "y"
                : locale === "pt"
                ? "e"
                : locale === "de"
                ? "und"
                : "and"}{" "}
              <span className="text-primary font-bold">Phantom</span>
            </p>
          </div>

          <div className="w-full max-w-full hiddenScroll overflow-scroll flex gap-2">
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
            <div className="w-[400px] min-w-[400px] h-64 bg-slate-400"></div>
          </div>

          <p className="my-10 w-full md:w-4/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi soluta
            quam incidunt. Corrupti eius delectus nesciunt eos reprehenderit
            fuga nemo ducimus rerum? Enim repellendus facere voluptates
            consequuntur, porro corporis pariatur!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default HowItWorks;
