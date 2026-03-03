import Icon from "../ui/Icon.tsx";
import {ICONS} from "../../constants/icons.ts";
import React from "react";

interface AuthContainerProps {
  icon: keyof typeof ICONS;
  title: string;
  description?: string | React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  formId?: string;
  isError?: boolean;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
                                                              icon,
                                                              title,
                                                              description,
                                                              onSubmit,
                                                              children,
                                                              className = '',
                                                              formId = 'auth-step-form',
                                                              isError = false
                                                            }) => {
  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="flex-1 select-none flex flex-col justify-center items-center gap-lg w-[356px]"
    >
      <div className={`flex select-none flex-col justify-center items-center gap-sm ${className}`}>
        <Icon icon={icon} size={108}
              className={`transition-colors duration-300 ${isError ? "text-red" : "text-primary"}`}/>
        <h1 className="text-xxxl font-bold text-text-main">{title}</h1>
      </div>

      <div className="w-full flex flex-col items-center gap-md">
        {children}
      </div>

      {description && (
        <p className={`text-center font-medium text-md w-full break-words transition-colors duration-300 ${
          isError ? "text-red" : "text-text-secondary"
        }`}>
          {description}
        </p>
      )}

      <button type="submit" className="hidden"/>
    </form>
  );
};

export default AuthContainer;
