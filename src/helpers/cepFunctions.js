export const getAddress = async (cep) => {
  const api1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const api2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  return Promise.any([api1, api2])
    .then((result) => result.json())
    .catch(() => {
      throw new Error('CEP não encontrado');
    });
};

const showCep = document.querySelector('.cart__address');

export const searchCep = async () => {
  try {
    const cepInput = document.querySelector('.cep-input').value;
    const functionCEP = await getAddress(cepInput);
    console.log(functionCEP);
    if (functionCEP) {
      const { address, district, city, state } = functionCEP;
      const showInfos = `${address} - ${district} - ${city} - ${state}`;
      showCep.innerText = showInfos;
    }
  } catch (error) {
    showCep.innerHTML = error.message;
  }
};
