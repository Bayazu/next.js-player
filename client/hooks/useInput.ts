import React, { useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setValue(target.value);
  };
  return {
    value,
    onChange,
  };
};
