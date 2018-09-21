// @flow

import * as React from 'react';

import s from './Input.scss';

type Props = {
  label: string|number,
  type: string|number,
  value: string|number,
  name: string|number,
  placeholder: string|number,
  checked: boolean,
  onChange: (e: SyntheticEvent<any>) => void,
}

export const Input = (props: Props) => {
  const { label, type, value, name, placeholder, checked, onChange } = props;
  const style = getStyle(type);

  return (
    <label className={s.label}>
      { type === 'text' && label }
      <input
        className={style.join(' ')} 
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        checked={checked}
        onChange={onChange}
      />
      { type !== 'text' && label }
    </label>
  )
}

function getStyle(type: string|number) {
  let style = [s.input]
  if (type !== 'text') {
    style.push(`${s.checkbox}`)
  }
  return style;
}


export default Input;