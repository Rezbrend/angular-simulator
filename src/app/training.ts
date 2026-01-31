// 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. Полностью типизировать параметры, значение, возвращаемое функцией.

function sumNumbers(a: number, b: number): number {
  return a + b;
}

sumNumbers(2, 3);

// 4. Создать переменную status, которая может быть только: "loading", "success", "error".

type Status = 'loading' | 'success' | 'error';
const statuss: Status = 'error';

// 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'".

type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';
const textFormat: TextFormat = 'uppercase';

// 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным.

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

// 7. Создать интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля.

interface IStudent extends IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    street: string;
    city: string;
  };
}

// 8. Создать функцию, которая принимает строку и вариант,  как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.

function formatString(text: string, format: TextFormat): string {
  switch (format) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      if (text.length === 0) return text;
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}

console.log(formatString('hello world', 'uppercase'));
console.log(formatString('hello world', 'lowercase'));
console.log(formatString('hello world', 'capitalize'));

// 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа.

function removeChar(text: string, char: string): string {
  return text.split(char).join('');
}

console.log(removeChar('banana', 'a'));
console.log(removeChar('test', 'a'));

// 10. Создать массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров.

const users: IUser[] = [
  {
    id: 1,
    firstName: 'Илья',
    lastName: 'Шабанов',
    email: 'ilya221@mail.ru',
    phone: '+7 (999) 123-45-67',
  },
  {
    id: 2,
    firstName: 'Шамиль',
    lastName: 'Петров',
    email: 'shama.petrov@mail.ru',
    phone: '+7 (999) 789-01-23',
  },
  {
    id: 3,
    firstName: 'Ренат',
    lastName: 'Меджидов',
    email: 'renat333@gmail.ru',
    phone: '+7 (999) 789-43-23',
  },
];

const filteredByEmail = users.filter((user) => user.email.includes('gmail.ru'));
