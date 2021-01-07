import React, {TextareaHTMLAttributes, forwardRef} from "react";
import styles from './Textarea.module.css'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>( (
  {
    className,
    ...rest
  },
  ref
) => {
  return (
    <textarea
      ref={ref}
      className={`${styles.textarea} ${className}`}
      {...rest}
    />
  )
})
