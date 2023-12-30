import { TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type FormTimePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
};
export default function FormTimePicker({
  name,
  label,
  required,
}: FormTimePickerProps) {
  const { control, setValue } = useFormContext();
  const format = "HH:mm";

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            size="large"
            // defaultValue={dayjs(field.value ? field.value : "00:00", "HH:mm")}
            format={format}
            onChange={(el, value) => {
              setValue(name, value);
            }}
            style={{ width: "100%" }}
          />
        )}
      />
    </>
  );
}
