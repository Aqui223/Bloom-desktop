import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; 
import TextInput from "../../ui/TextInput.tsx";
import Button from "../../ui/Button.tsx";
import AuthTitle from "../AuthTitle.tsx";
import Icon from "../../ui/Icon.tsx"; 
import parseEmail from "../../../lib/parseEmail.ts";
import { PROVIDERS_LOGOS } from "../../../constants/providerLogos.ts";
import { Variants } from "framer-motion";

interface AuthEmailProps {
  email: string;
  setEmail: (val: string) => void;
  onNext: () => void;
}

const animVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.15, ease: "circOut" } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.5,
    transition: { duration: 0.15, ease: "circOut" } 
  }
};

export default function AuthEmail({email, setEmail, onNext}: AuthEmailProps) {
  const [provider, setProvider] = useState<keyof typeof PROVIDERS_LOGOS | 'unknown'>('unknown');
  const isValid = email.trim().length > 0 && email.includes('@');

  useEffect(() => {
    const { provider: parsedProvider } = parseEmail(email);
    setProvider(parsedProvider);
  }, [email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    onNext();
  };

  const animatedIcon = (
    <AnimatePresence mode="wait" initial={false}>
      {provider === 'unknown' ? (
        <motion.div
          key="icon-at"
          variants={animVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center w-full h-full absolute inset-0"
        >
          <Icon icon="at" size={24} className="text-text-secondary" />
        </motion.div>
      ) : (
        <motion.div
          key={`provider-${provider}`}
          variants={animVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center w-full h-full absolute inset-0"
        >
          <img 
            src={PROVIDERS_LOGOS[provider]} 
            alt={provider}
            className="w-6 h-6 object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center items-center gap-lg w-[356px]">
      <AuthTitle icon="at" title="Введите почту"/>

      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        type="email"
        leftElement={animatedIcon}
      />

      <p className="text-center select-none font-medium text-md text-text-secondary w-full break-words">
        После этого мы отправим 6-значный код подтверждения на вашу почту
      </p>

      <Button type="submit" disabled={!isValid}>
        Продолжить
      </Button>
    </form>
  );
}