export interface PasswordOption {
  upperCase?: boolean;
  lowerCase?: boolean;
  number?: boolean;
  symbol?: boolean;
}

export interface PasswordConfig {
  upperCases?: string;
  lowerCases?: string;
  numbers?: string;
  symbols?: string;
}

export class Password {
  protected _upperCases: string;
  protected _lowerCases: string;
  protected _numbers: string;
  protected _symbols: string;
  protected _password: string;

  constructor(length: number, option?: PasswordOption, config?: PasswordConfig) {
    this._upperCases = config?.upperCases || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this._lowerCases = config?.lowerCases || 'abcdefghijklmnopqrstuvwxyz';
    this._numbers = config?.numbers || '0123456789';
    this._symbols = config?.symbols || '!@#$%^&*()-_+=[]{};:"\'\\|~`,.<>/?';

    this._password = this.generate(length, option);
  }

  protected generate = (length: number, option: PasswordOption = {
    upperCase: true,
    lowerCase: true,
    number: true,
    symbol: false,
  }): string => {
    if (!option.upperCase && !option.lowerCase && !option.number && !option.symbol) {
      throw new Error('None of the characters used in the password are enabled');
    }

    const minLength = [
      option.upperCase,
      option.lowerCase,
      option.number,
      option.symbol,
    ].filter(value => value).length;
    if (length - minLength < 0) {
      throw new Error(`Specified number of characters is less than ${minLength}`);
    }

    let characters = '';
    if (option.lowerCase) characters += this._lowerCases;
    if (option.upperCase) characters += this._upperCases;
    if (option.number) characters += this._numbers;
    if (option.symbol) characters += this._symbols;

    let str = '';
    for (let index = 0; index < length - minLength; index++) {
      str += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if (option.upperCase) {
      const upperCase = this._upperCases.charAt(Math.floor(Math.random() * this._upperCases.length));
      str += upperCase;
    }

    if (option.lowerCase) {
      const lowerCase = this._lowerCases.charAt(Math.floor(Math.random() * this._lowerCases.length));
      str += lowerCase;
    }

    if (option.number) {
      const num = this._numbers.charAt(Math.floor(Math.random() * this._numbers.length));
      str += num;
    }

    if (option.symbol) {
      const symbol = this._symbols.charAt(Math.floor(Math.random() * this._symbols.length));
      str += symbol;
    }
  
    const password = str.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  };

  toString = (): string => {
    return this._password;
  };
}