export const checkWhiteSpace = (valor) => {
   const regex = /\S/;
   return regex.test(valor);
}

export const validateName = (nome) => {
   const regex = /[0-9]/;
   return regex.test(nome);
}

export const validateEmail = (email) => {
   const regex = /\S+@\S+\.\S+/;
   return regex.test(email)
}

export const validatePhoneNumber = (tel) => {
   const regex = /^\(11\) 9\d{4}-\d{4}|\((?:1[2-9]|[2-9]\d)\) [5-9]\d{3}-\d{4}$/;
   return regex.test(tel);
}