const MIN_USERNAME_LENGTH = 1;
const MIN_PASWORD_LENGTH = 8;

type FieldType = 'username' | 'password';

export function fieldValidate(type: FieldType, value: string) {
    if (type === 'username') {
        return value.length >= MIN_USERNAME_LENGTH;
    } else if (type === 'password') {
        return value.length >= MIN_PASWORD_LENGTH;
    } else {
        return false;
    }
}