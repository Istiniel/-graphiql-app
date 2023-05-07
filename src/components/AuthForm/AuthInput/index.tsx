import React, { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import styles from './AuthInput.module.scss'
import Input from '@/UI/Input'

type AuthInputProps = {
  name: string
  type?: HTMLInputTypeAttribute
  rules:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined
  control: Control
}

const AuthInput: React.FC<AuthInputProps> = ({ name, type, control, rules }) => {
  return (
    <div className={styles.input}>
      <Controller
        control={control}
        name={name}
        defaultValue={''}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { invalid } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder={name[0].toUpperCase() + name.slice(1)}
            type={type}
            invalid={invalid}
          />
        )}
      />
    </div>
  )
}

export default AuthInput
