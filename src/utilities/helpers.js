import moment from 'moment';

export const roundTo = (number, decimalPlaces) => {
  return Math.round((number * 10 ** decimalPlaces) / 10 ** decimalPlaces);
};

export const roundToExactly = (number, decimalPlaces) => {
  return roundTo(number, decimalPlaces).toFixed(decimalPlaces);
};

export const toArray = value => {
  if (Array.isArray(value)) {
    return value;
  }
  if (!value) {
    return [];
  }
  return [value];
};

export const percentageStringToNumber = value =>
  toNumber(value ? value.substring(0, value.length - 1) : '0');

export const numberToPercentageString = value => value.toString().concat('%');

export const toNumber = value => {
  const temp = value ? String(value).replace('%', '') : '';
  return temp ? Number(temp) : '';
};

export const uniqueArray = arr => {
  return Array.from(new Set(arr));
};

export const within90Days = date => {
  const currentDate = moment().startOf('day');
  return (
    moment
      .utc(date)
      .startOf('day')
      .diff(currentDate, 'days') <= 90
  );
};

export const getSelectedList = (item, selectedList, idKey) => {
  const isSelectedList = selectedList;
  if (isSelectedList.length > 0) {
    let index = -1;

    if (typeof item === 'object') {
      index = isSelectedList.findIndex(x => x[idKey] === item[idKey]);
    } else index = isSelectedList.indexOf(item);

    if (index !== -1) {
      isSelectedList.splice(index, 1);
    } else isSelectedList.push(item);
  } else {
    isSelectedList.push(item);
  }
  return isSelectedList;
};

export const getChangedList = (item, selectedList, keys) => {
  const isSelectedList = selectedList;
  if (isSelectedList.length) {
    const isPresent = isSelectedList.some(x => {
      const temp = x;
      if (temp[keys.idKey] === item[keys.idKey]) {
        temp[keys.toChangeKey] = item[keys.toChangeKey];
        return true;
      }
      return false;
    });

    if (!isPresent) {
      isSelectedList.push(item);
    }
  } else {
    isSelectedList.push(item);
  }
  return isSelectedList;
};

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getPrettyString = word => {
  return word.replace(/([A-Z])/g, ' $1').replace(/^./, str => {
    return str.toUpperCase();
  });
};

export const idWithPrefix = (id, prefix) => {
  return prefix + id;
};

export const convertHTMLStringToString = htmlString => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || '';
};
