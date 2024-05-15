export const fetchData = async (url, setData, setLoading) => {
  setLoading(true);
  try {
    console.log(`Fetching data from URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setData(data)
    // console.log('Data fetched successfully:', data);

    if (Array.isArray(data)) {
      setData(data);
    } else {
      console.error('Erro: Dados recebidos não são um array.', data);
      Alert.alert('Erro', 'Dados recebidos não são um array');
      setData([]); // Define como array vazio em caso de erro
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    Alert.alert('Erro', 'Não foi possível buscar os dados');
    setData([]); // Define como array vazio em caso de erro
  } finally {
    setLoading(false);
  }
};
