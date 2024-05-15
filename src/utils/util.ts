import * as fs from 'fs';

export const convertISODate = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  const pad = (num: number) => {
    let r = String(num);
    if (r.length === 1) {
      r = '0' + r;
    }
    return r;
  };

  const toISO = () => {
    return (
      dateObj.getFullYear() +
      '-' +
      pad(dateObj.getMonth() + 1) +
      '-' +
      pad(dateObj.getDate()) +
      'T' +
      pad(dateObj.getHours()) +
      ':' +
      pad(dateObj.getMinutes()) +
      ':' +
      pad(dateObj.getSeconds()) +
      '.' +
      String((dateObj.getMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
      'Z'
    );
  };

  return toISO();
};

export const fileDelete = (path: string, filename: string): boolean => {
  try {
    if (fs.existsSync(`${path}/${filename}`)) {
      fs.unlinkSync(`${path}/${filename}`);
      return true;
    }
  } catch (err) {
    return true;
  }
};

export const handleErrorMessage = (value: any) => {
  return value?.message ? value?.message : value;
};
