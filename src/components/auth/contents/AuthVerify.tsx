import React, { useEffect, useRef, useState, useCallback } from "react";
import AuthTitle from "../AuthTitle.tsx";
import VerifyInput from "../VerifyInput.tsx";

interface AuthVerifyProps {
  onNext: () => void;
}

export default function AuthVerify({ onNext }: AuthVerifyProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isError, setIsError] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveIndicator = useCallback((target: HTMLInputElement | null) => {
    const indicator = indicatorRef.current;
    if (!indicator || !target) {
      if (indicator) indicator.style.opacity = '0';
      return;
    }

    const width = target.offsetWidth;
    const left = target.offsetLeft;

    requestAnimationFrame(() => {
      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.opacity = '1';
    });
  }, []);

  useEffect(() => {
    const currentCode = code.join('');
    if (currentCode.length === 6) verifyCode(currentCode);
  }, [code]);

  const verifyCode = (fullCode: string) => {
    if (fullCode !== "123456") {
      setIsError(true);
    } else {
      setIsError(false);
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    if (isError) setIsError(false);

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value !== '' && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
      moveIndicator(nextInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (isError) setIsError(false);
      if (code[index] === '' && index > 0) {
        const prevInput = inputRefs.current[index - 1];
        prevInput?.focus();
        moveIndicator(prevInput);
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isError) setIsError(false);
    const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');

    if (pasteData) {
      const newCode = [...code];
      pasteData.split('').forEach((char, i) => newCode[i] = char);
      setCode(newCode);
      
      const focusIndex = Math.min(pasteData.length, 5);
      const targetInput = inputRefs.current[focusIndex];
      targetInput?.focus();
      moveIndicator(targetInput);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    moveIndicator(e.target);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
        const indicator = indicatorRef.current;
        if (indicator) indicator.style.opacity = '0';
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-lg w-[356px]">
      <AuthTitle icon="id" title="Проверка почты" />
      
      <div 
        ref={containerRef}
        className="relative flex justify-center items-center gap-sm w-full"
        onBlur={handleBlur} 
      >
        <div
          ref={indicatorRef}
          className={`absolute pointer-events-none border-2 rounded-sm top-0 bottom-0 z-10 box-border
            transition-all duration-200 ease-out will-change-transform
            ${isError ? 'border-red ring-2 ring-backdrop-red/20' : 'border-primary'}
          `}
          style={{
            left: 0, 
            opacity: 0,
          }}
        />

        {code.map((digit, index) => (
          <React.Fragment key={index}>
            <VerifyInput
              ref={(el) => { inputRefs.current[index] = el; }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={handleFocus}
              placeholder="0"
              inputMode="numeric"
              autoComplete="one-time-code"
              error={isError}
            />
            {index === 2 && (
              <span className={`text-xl font-light mx-1 transition-colors ${isError ? 'text-red' : 'text-text-secondary'}`}>
                —
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}