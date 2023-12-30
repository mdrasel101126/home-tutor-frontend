import { DatePicker, DatePickerProps, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type UMDatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
  required?: boolean;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = "large",
  required,
}: UMDatePikerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, date);
  };
  const dateFormat = "YYYY-MM-DD";

  return (
    <div>
      {" "}
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
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            // defaultValue={dayjs("2023-01-01", dateFormat) || dayjs(field.value)}
            size={size}
            onChange={handleOnChange}
            style={{ width: "100%" }}
            format={dateFormat}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
