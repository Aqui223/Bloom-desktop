import {forwardRef, InputHTMLAttributes} from 'react';

export interface VerifyInputInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const VerifyInput = forwardRef<HTMLInputElement, VerifyInputInputProps>(
  ({error, className = '', value, ...props}, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        className={`
          text-xxxl h-xsuper text-center rounded-sm flex-1 w-full selection:bg-transparent
          bg-foreground-soft font-semibold
          placeholder:text-text-secondary text-text-main
          caret-transparent focus:outline-none 
          ${error ? '!text-red' : ''}
          ${className}
        `}
        {...props}
      />
    );
  }
);

export default VerifyInput;