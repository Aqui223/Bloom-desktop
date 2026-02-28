import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import AuthEmail from "./contents/AuthEmail.tsx";
import AuthSignUp from "./contents/AuthSignUp.tsx";
import AuthVerify from "./contents/AuthVerify.tsx";
import Icon from "../ui/Icon.tsx";
import Button from "../ui/Button.tsx";

interface AuthContentProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
  }),
};

export function AuthContent({step, onNext, onPrev}: AuthContentProps) {
  const [email, setEmail] = useState("");

  const [currentStep, setCurrentStep] = useState(step);
  const [direction, setDirection] = useState(1);

  if (step !== currentStep) {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }

  return (
    <>
      {step > 0 && (
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
          <Button variant="icon-secondary" onClick={onPrev}>
            <Icon size={30} icon="chevron.left"/>
          </Button>
        </div>
      )}

      <div className="grid h-full">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="col-start-1 row-start-1 h-full w-auto flex flex-col justify-center"
          >
            {step === 0 && <AuthEmail email={email} setEmail={setEmail} onNext={onNext}/>}
            {step === 1 && <AuthVerify onNext={onNext}/>}
            {step === 2 && <AuthSignUp onNext={onNext}/>}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
