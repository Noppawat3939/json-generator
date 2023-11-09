import type { ChangeEvent, FormEvent } from "react";

export type FormValueProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
