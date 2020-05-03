const formatDate = (value: Date): string =>
  Intl.DateTimeFormat('br-BR').format(value);
export default formatDate;
