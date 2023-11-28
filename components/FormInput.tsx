import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", placeholder }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full text-black rounded-lg appearance-none focus:outline-none py-2 px-4 border ${errors[name] && "border-red-500"}`}
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
