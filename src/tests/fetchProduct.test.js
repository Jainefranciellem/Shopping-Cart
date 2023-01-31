import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';
const endpoint = "https://api.mercadolibre.com/items/MLB1405519561";
// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProductsList é uma função', () => {
    expect( typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Teste se o retorno da função fetchProductsList com o argumento "computador" é igual ao objeto computadorSearch.', async () => {
    const ProductList = await fetchProduct('MLB1405519561');
    expect(ProductList).toBe(product);
  });

  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: "Termo de busca não informado".', () => {
    expect(() => fetchProduct()).rejects.toThrowError('ID não informado');
  });
});
