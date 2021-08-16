const regex = new RegExp(/^\S+@\S+$/i);

export default function isEmail(email: string) {
  return regex.test(email);
}
