// Required rule
export const requiredRule =
  (message: string = "Поле обязательно для заполнения.") =>
  (value: string): any => {
    if (value) return true;
    return message;
  };
// Field length must be greater than 'num'
export const greaterThen =
  (message: string = "Длина поля должна быть больше", num: number) =>
  (value: string): any => {
    if (value && value.length > num) return true;
    return `${message} - ${num}`;
  };

// Field length must be less than 'num'
export const lessThen =
  (message: string = "Длина поля должна быть меньше", num: number) =>
  (value: string): any => {
    if (value && value.length < num) return true;
    return `${message} - ${num}`;
  };

export const exactLength =
  (message: string = "Длина поля должна быть", num: number) =>
  (value: string): any => {
    if (value && value.length === num) return true;
    return `${message} - ${num}`;
  };
