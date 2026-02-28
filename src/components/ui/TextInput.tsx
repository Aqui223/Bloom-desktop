import {forwardRef, InputHTMLAttributes} from 'react';
import Icon from './Icon.tsx';
import {ICONS} from '../../constants/icons.ts';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof ICONS;
  error?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({icon = 'at', error, className = '', value, ...props}, ref) => {
    const hasText = Boolean(value || props.defaultValue);

    return (
      <div
        className={`
          flex h-xxxxl w-full items-center rounded-full bg-foreground-soft pr-xxxxl transition-shadow
          ${error ? 'ring-2 !ring-backdrop-red' : ''}
          ${className}
        `}
      >
        <div className="flex aspect-square h-full items-center justify-center">
          <Icon
            icon={icon}
            size={24}
            className={`
            transition-colors ${hasText ? 'text-text-main' : 'text-text-secondary'}
            ${error ? '!text-red' : ''}
            `}
          />
        </div>

        <input
          ref={ref}
          value={value}
          className="text-md h-full w-full bg-transparent focus:outline-none placeholder:text-text-secondary placeholder:text-md"
          {...props}
        />
      </div>
    );
  }
);

export default TextInput;
